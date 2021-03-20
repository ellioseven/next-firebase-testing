import * as functions from "firebase-functions";
import "@ellioseven/next-firebase-firebase";

export const outputExampleChange = functions.firestore
  .document(`example/{id}`)
  .onUpdate(async (change) => {
    const data = change.before.data();
    console.log(data);
  });
