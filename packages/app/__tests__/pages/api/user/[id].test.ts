import * as functions from "firebase-functions-test";
import { config, seed } from "@ellioseven/next-firebase-firebase";
import http from "node-mocks-http";
import endpoint from "@pages/api/user/[id]";

const test = functions.default();

afterEach(async () => {
  await test.firestore.clearFirestoreData({
    projectId: config.projectId,
  });
});

it("gets user data", async () => {
  await seed();

  const response: any = http.createResponse();
  const request: any = http.createRequest({
    method: "GET",
    query: {
      id: "10",
    },
  });

  await endpoint(request, response);
  const data = response._getJSONData();

  expect(data).toEqual({
    id: "10",
    name: "Example data",
  });
});
