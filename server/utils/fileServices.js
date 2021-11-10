const { bucket } = require('../config/db');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

const fileServerUploader = file => {
  // Create a Unique name for file
  const fileName = Date.now() + '_' + file.name;

  console.log('File Name: ' + fileName);

  // Define the server path
  const filePath = path.join(__dirname, '../', `/public/uploads/${fileName}`);

  console.log('File Path: ' + filePath);

  // Take the file object & use "mv" method to move file where we want it on our server
  file.mv(filePath);

  console.log(`Server Uploaded File Path: ${filePath}`);

  return fileName;
};

const storageBucketUploader = async (folder, filename) => {
  // Generate random token (uuid)
  const storageToken = uuid.v4();

  // Declaring filePath + options
  const filePath = `./server/public/uploads/${filename}`;

  const destFileName = filename;

  const options = {
    destination: `${folder}/${destFileName}`,
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
  const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${folder}%2F${destFileName}?alt=media&token=${storageToken}`;

  // Delete the files from temporary server location after bucket upload (/server/public/uploads)
  fs.unlink(filePath, err => {
    if (err) {
      return {
        message: 'Error occurred in removing file from temporary local storage',
      };
    } else {
      console.log('File in temporary local storage deleted');
    }
  });

  return downloadUrl;
};

const getFilePathFromUrl = (folder, downloadUrl) => {
  // Slice off the base URL from downloadURL
  const baseURL = `https://firebasestorage.googleapis.com/v0/b/spork-s.appspot.com/o/${folder}%2F`;

  let filePath = downloadUrl.replace(baseURL, `${folder}/`);

  filePath = filePath.split('?')[0];

  // Return filepath to be deleted
  console.log(`File in Bucket for Deletion: ${filePath}`);
  return filePath;
};

const deleteFileFromBucket = async filePath => {
  // Determine File Location in Storage
  // NOTE: You would ALSO want to CHECK if it existed in the storage bucket before deletion OTHERWISE it would hit an error!
  const file = bucket.file(filePath);
  const fileChecker = await file.exists();

  // [400 ERROR] Check for Item Existing in Storage Bucket
  // NOTE: To ensure our delete function still works against Firestore DB, we will modify the delete request to prevent an error.
  if (fileChecker[0] === false) {
    // [TOGGLE]: Set custom option parameter to prevent error returning
    const options = {
      ignoreNotFound: false,
    };

    //   // Call modified delete request (no deletion from storage bucket)
    //   // NOTE: Default option is "false", meaning error is issued and delete request fails if file does NOT exist!
    const data = await file.delete(options);
    console.log(
      `The file: ${filePath}, does not exist in Storage.  Please check server for inconsistent data handling & database queries.`
    );

    //   // Return API response to controller
    return data[0];
  } else {
    // Call standard delete request
    const data = await file.delete();
    console.log(`File deleted from Storage Bucket: ${filePath}`);

    //   // Return API response to controller
    return data[0];
  }
};

const validateFile = (file, maxSize, fileTypes) => {
  // (a) Check for file exists
  // if (file === null) {
  //   return {
  //     message: 'No file uploaded',
  //   };
  // }

  // (b) Check if file size exceeds set size
  if (file.photo.size > maxSize) {
    return {
      message: 'The file is too large',
    };
  }

  // (c) Restrict file types
  // (i) Split the extension from file name & store
  let ext = file.photo.name;
  ext = ext.split('.').pop();
  ext = ext.toLowerCase();
  console.log(ext);

  // (ii) Destructure the accepted file types passed in a third parameter array
  // const [png, jpeg, gif, jpg] = fileTypes;

  // (iii) Check for restrictions against declared variable strings
  if (!(ext === 'png' || ext === 'jpeg' || ext === 'jpg' || ext === 'gif')) {
    return {
      message: `Please upload an accepted image file type`,
    };
  }
};

module.exports = {
  storageBucketUploader,
  fileServerUploader,
  validateFile,
  getFilePathFromUrl,
  deleteFileFromBucket,
};
