import * as admin from "firebase-admin";

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const db = admin.firestore();
const collection = db.collection("example");

const main = async () => {
  const data = {
    id: "10",
    name: "Example data"
  }

  await collection.doc(data.id).set(data)
}

(async() => await main())()
