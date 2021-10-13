const { bucket } = require('../config/db');
const uuid = require('uuid');

const uploadFile = async filename => {
  // Generate random token (uuid)
  const storageToken = uuid.v4();

  // Declaring filePath + options
  const filePath = `./server/public/uploads/${filename}`;

  const destFileName = filename;

  const options = {
    destination: destFileName,
    resumable: false,
    validation: 'crc32c',
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: storageToken,
      },
    },
  };

  // Call Firebase Image Upload Function to save to storage bucket
  const result = await bucket.upload(filePath, options);

  // Obtain bucket storage bucket name from our upload result
  const bucketName = result[0].metadata.bucket;

  // Construct our Dynamic URL
  const url = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${destFileName}?alt=media&token=${storageToken}`;

  return url;
};

module.exports = { uploadFile };
