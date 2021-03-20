import { seed } from "@ellioseven/next-firebase-firebase";

const main = async () => {
  await seed();
};

(async () => await main())();
