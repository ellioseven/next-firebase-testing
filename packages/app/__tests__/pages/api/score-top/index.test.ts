import * as functions from "firebase-functions-test";
import {
  AggregateScoreTableRow,
  collectionAggregateScoreTable,
  config,
} from "@ellioseven/next-firebase-firebase";
import http from "node-mocks-http";
import endpoint from "@pages/api/score-top";

const test = functions.default(config);

afterEach(async () => {
  await test.firestore.clearFirestoreData(config);
});

it("gets top scores", async () => {
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

  // Write table.
  for (const index in scores) {
    const score = scores[index];
    await collectionAggregateScoreTable.doc(index.toString()).set(score);
  }

  const response: any = http.createResponse();
  const request: any = http.createRequest({
    method: "GET",
  });

  await endpoint(request, response);
  const result = response._getJSONData();

  expect(result).toEqual(scores);
});
