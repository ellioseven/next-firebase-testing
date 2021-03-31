import * as functions from "firebase-functions";
import "@ellioseven/next-firebase-firebase";
import { commitScoreToTable, Score } from "@ellioseven/next-firebase-firebase";

export const onScoreWrite = functions.firestore
  .document(`scores/{id}`)
  .onWrite(async (change) => {
    if (change.after.exists) {
      const data = change.after.data() as Score;
      await commitScoreToTable(data);
    }
  });
