import * as admin from "firebase-admin";

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const { FIREBASE_CONFIG } = process.env;

export const db = admin.firestore();

export const config = FIREBASE_CONFIG ? JSON.parse(FIREBASE_CONFIG) : {};

export const seed = async () => {};
