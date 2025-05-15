import { MongoClient } from "mongodb";

// Now that I am using render for this in-between, I am going to use mongodb

const ADMIN_PASS = process.env.ADMIN_PASS; // So that the discord bot can call reads + writes to any file needed.
// If the URI doesn't exist, this middleman does nothing.


let CLIENT: undefined | MongoClient;


export async function connectToMongoDB() {
  const URI = process.env.MONGO_URI;
  if (!URI) {
    console.error("ERROR: NO MONGOURI SET");
    process.exit();
  }
  CLIENT = new MongoClient(URI);
  try {
    await CLIENT.connect();
    console.log("Successfully connected to MONGODB!");
  } catch (err) {
    console.error("Error connecting to MONGODB!", err);
    process.exit(0);
  }
}

export default function getClient() {
  return CLIENT;
}

process.addListener("beforeExit", async () => {
  if (!CLIENT) return;
  await CLIENT.close();
  console.log("MongoDB connection closed");
})
