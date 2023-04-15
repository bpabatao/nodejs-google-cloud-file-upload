const fs = require('fs');
const crypto = require('crypto');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("file_sharing_bucket_sample");

class FileService {
  async generatePrivateKey(publicKey) {
    const hash = crypto.createHash('sha256');
    hash.update(publicKey);
    return hash.digest('hex');
  }

  async deleteFile(privateKey) {
    const [files] = await bucket.getFiles({ prefix: '' });
    for (const file of files) {
      const publicKey = file.metadata.name;

      const currentfile = await bucket.file(publicKey);

      console.log(privateKey, file.metadata.name, await this.generatePrivateKey(publicKey));
      if (privateKey === await this.generatePrivateKey(publicKey)) {
        await currentfile.delete();
        await bucket.file(publicKey);
        break;
      }
    }
  }
}

module.exports = { FileService };
