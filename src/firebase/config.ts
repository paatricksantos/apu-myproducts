import * as admin from 'firebase-admin';

const serviceAccount = require('./service-account-credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'myproducts--alest.appspot.com',
  databaseURL: 'https://myproducts--alest.firebaseio.com',
});

export const storageRef = admin.storage();

export const bucket = storageRef.bucket();

export const db = admin.firestore();
