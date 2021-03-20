import { collectionExample } from "@ellioseven/next-firebase-firebase"

const main = async () => {
  const data = {
    id: "10",
    name: "Example data"
  }

  await collectionExample.doc(data.id).set(data)
}

(async() => await main())()
