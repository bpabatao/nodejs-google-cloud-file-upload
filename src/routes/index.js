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
  // UPLOAD file 
  router.post("/upload", controller.upload);

  // GET file list
  router.get("/files", controller.getListFiles);

   // GET file details by public key
  router.get("/files/:publicKey", controller.getFileDetails);

  // DELETE file by private key
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
