const express = require("express");
const router = express.Router();
const controller = require("../controller/file-controller");
const multer = require('multer');
const fs = require('fs');
const { FileService } = require('./file-service');


// Set up Multer for file uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.FOLDER || './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Initialize file service
const fileService = new FileService();

let routes = (app) => {
  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.getFileDetails);

  // Define the file upload endpoint
  router.post('/files', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }

      const publicKey = await fileService.uploadFile(req.file.path);
      const privateKey = await fileService.generatePrivateKey(publicKey);

      fs.unlinkSync(req.file.path); // Remove the file from disk

      res.status(200).json({ publicKey, privateKey });
    } catch (err) {
      console.error('ee::', err);
      res.status(500).send('Error uploading file.');
    }
  });

  // Define the file download endpoint
  router.get('/files/:publicKey', async (req, res) => {
    try {
      const fileStream = await fileService.getFileStream(req.params.publicKey);
      res.setHeader('Content-Type', fileStream.contentType);
      fileStream.stream.pipe(res);
    } catch (err) {
      console.error(err);
      res.status(404).send('File not found.');
    }
  });

  // Define the file deletion endpoint
  router.delete('/files/:privateKey', async (req, res) => {
    try {
      await fileService.deleteFile(req.params.privateKey).catch(console.error);
      res.status(200).json({ message: 'File deleted.' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting file.');
    }
  });

  app.use(router);
};

module.exports = routes;
