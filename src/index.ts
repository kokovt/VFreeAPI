import { connectToMongoDB } from "./mongodb";
import setupExpress from "./express";
import dotenv from "dotenv";

let local_run = false;


for (let i = 0; i < process.argv.length; i++) {
  if (process.argv[i] == "--local") {
    local_run = true;
    dotenv.config();
  }
}

function startup() {
  connectToMongoDB();
  setupExpress();
}

startup();

