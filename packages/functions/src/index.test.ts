import * as functions from "firebase-functions-test";
import { onScoreWrite } from "./index";
import waitForExpect from "wait-for-expect";
import {
  config,
  collectionAggregateScoreTable,
  getScoreTable,
  AggregateScoreTableRow,
} from "@ellioseven/next-firebase-firebase";

const test = functions(config);

afterEach(async () => {
  await test.firestore.clearFirestoreData(config);
});

describe("top scores", () => {
  it("adds a top score", async () => {
    const scores: AggregateScoreTableRow[] = [
      { name: "John", score: 90 },
      { name: "Elliot", score: 87 },
      { name: "Jess", score: 80 },
      { name: "Nigel", score: 79 },
      { name: "Tammy", score: 70 },
      { name: "Jackson", score: 68 },
      { name: "Bill", score: 65 },
      { name: "Sarah", score: 60 },
      { name: "Felix", score: 40 },
      { name: "Bobby", score: 20 },
    ];

    // Pre-populate Firestore with score table.
    for (const index in scores) {
      const score = scores[index];
      await collectionAggregateScoreTable.doc(index.toString()).set(score);
    }

    // As we are emulating document creation, the before data should be null.
    // Change null to a value to simulate a change in existing data.
    const snapBefore = null;

    // Make snapshot for state of database after the change
    const snapAfter = test.firestore.makeDocumentSnapshot(
      {
        name: "Jill",
        score: 95,
      },
      "scores/110"
    );

    // Emulate document change to trigger function behaviour.
    // This doesn't persist any data to Firestore, it will only simulate the
    // behaviour or the document changes.
    const change = test.makeChange(snapBefore, snapAfter);
    const func = test.wrap(onScoreWrite);
    await func(change);

    // Functions run synchronous in the background, which means we have to
    // "wait and retry" to be able to assert data.
    await waitForExpect(async () => {
      const table = await getScoreTable();
      expect(table).toEqual([
        { name: "Jill", score: 95 },
        { name: "John", score: 90 },
        { name: "Elliot", score: 87 },
        { name: "Jess", score: 80 },
        { name: "Nigel", score: 79 },
        { name: "Tammy", score: 70 },
        { name: "Jackson", score: 68 },
        { name: "Bill", score: 65 },
        { name: "Sarah", score: 60 },
        { name: "Felix", score: 40 },
      ]);
    });
  });
});
