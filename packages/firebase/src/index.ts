import * as admin from "firebase-admin";

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const { FIREBASE_CONFIG } = process.env;

export const db = admin.firestore();

export const config = FIREBASE_CONFIG ? JSON.parse(FIREBASE_CONFIG) : {};

export const collectionExample = db.collection("example");

export const seed = async () => {
  const data = {
    id: "10",
    name: "Example data",
  };

  await collectionExample.doc(data.id).set(data);
};
