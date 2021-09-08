const admin = require('firebase-admin');
require('dotenv').config();

try {
  console.log('Connecting to Database....');

  admin.initializeApp({
    credential: admin.credential.cert(
      process.env.GOOGLE_APPLICATION_CREDENTIALS
    ),
    storageBucket: process.env.STORAGE_BUCKET,
  });

  console.log('Database connected.');
  const db = admin.firestore();

  const bucket = admin.storage().bucket();

  const auth = admin.auth();

  module.exports = { db, auth, bucket };
} catch (error) {
  console.log(error);
}
