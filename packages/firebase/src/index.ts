import * as firebase from "@services/firebase";
import * as score from "@collections/score";

export const db = firebase.db;
export const config = firebase.config;
export const seed = firebase.seed;

export const collections = {
  score,
};
