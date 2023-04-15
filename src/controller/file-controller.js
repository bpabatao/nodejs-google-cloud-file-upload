const processFile = require("../middleware/upload");
const { format } = require("util");
const { Storage } = require("@google-cloud/storage");
const { FileService } = require('./../routes/file-service');
const crypto = require('crypto');


const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("file_sharing_bucket_sample");

// Initialize file service
const fileService = new FileService();

const upload = async (req, res) => {
  try {
    await processFile(req, res);

    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    const publicKey = crypto.randomBytes(16).toString('hex');
    const privateKey = await fileService.generatePrivateKey(req.file.originalname);

    const uploadedFile = req.file.mimetype;
    const wordAfterSlash = uploadedFile.split('/')[1];

    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      res.status(500).send({ message: err.message });
    });

    blobStream.on("finish", async (data) => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      try {
        await bucket.file(req.file.originalname).makePublic();
      } catch {
        return res.status(500).send({
          message:
            `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
          publicUrl,
          privateKey
        });
      }

      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
        publicUrl,
        privateKey
      });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = async (req, res) => {
  try {
    const [files] = await bucket.getFiles();
    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file.name,
        publicKey: file.id,
        publicUrl: `https://storage.googleapis.com/${file.metadata.bucket}/${file.metadata.name}`,
      });
    });

    res.status(200).send(fileInfos);
  } catch (err) {
    res.status(500).send({
      message: "Unable to read list of files!",
    });
  }
};

const getFileDetails = async (req, res) => {
  try {
    const [metaData] = await bucket.file(req.params.publicKey).getMetadata();
    const privateKey = await fileService.generatePrivateKey(metaData.name)

    const fileInfos = {
      id: metaData.id,
      name: metaData.name,
      bucket: metaData.bucket,
      contentType: metaData.contentType,
      size: metaData.size,
      publicUrl: `https://storage.googleapis.com/${metaData.bucket}/${metaData.name}`,
      timeCreated: metaData.timeCreated,
      privateKey,
    };
    res.status(200).send(fileInfos);

  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "File not found",
    });
  }
};

module.exports = {
  upload,
  getListFiles,
  getFileDetails,
};
