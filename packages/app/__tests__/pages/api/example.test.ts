import * as functions from "firebase-functions-test";
import { db, config, seed } from "@ellioseven/next-firebase-firebase";

const test = functions.default();

afterEach(async () => {
  await test.firestore.clearFirestoreData({
    projectId: config.projectId,
  });
});

it("runs text", async () => {
  await seed();

  const doc = await db.collection("example").doc("10").get();
  const data = doc.data();

  expect(data).toEqual({
    id: "10",
    name: "Example data",
  });
});
