import * as functions from "firebase-functions-test";
import { config } from "@ellioseven/next-firebase-firebase";
import http from "node-mocks-http";
import { getScores } from "@ellioseven/next-firebase-firebase";
import endpoint from "@pages/api/score/create";

const test = functions.default(config);

afterEach(async () => {
  await test.firestore.clearFirestoreData(config);
});

it("creates score", async () => {
  const response: any = http.createResponse();
  const request: any = http.createRequest({
    method: "POST",
    body: JSON.stringify({
      name: "John",
      score: 10,
    }) as any,
  });

  await endpoint(request, response);

  const scores = await getScores();
  const last = scores.pop();
  const result = { name: last?.name, score: last?.score };

  expect(result).toEqual({
    name: "John",
    score: 10,
  });
});
