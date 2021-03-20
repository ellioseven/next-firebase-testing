import * as functions from "firebase-functions";
import * as admin from "firebase-admin"

admin.initializeApp()

export const outputExampleChange = functions
  .firestore.document(`example/{id}`)
  .onUpdate(async change => {
    console.log("triggers")
    const data = change.before.data();
    console.log(data)
  });
