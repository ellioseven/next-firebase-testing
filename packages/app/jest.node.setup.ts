import "@testing-library/jest-dom";
import fetch from "isomorphic-unfetch";

global.fetch = fetch;

const projectId = process.env.GCLOUD_PROJECT;

// Config is manually set to prevent:
// "Warning, estimating Firebase Config based on GCLOUD_PROJECT. Initializing firebase-admin may fail"
process.env.FIREBASE_CONFIG = JSON.stringify({
  databaseURL: `https://${projectId}.firebaseio.com`,
  storageBucket: `https://${projectId}.appspot.com`,
  projectId,
});
