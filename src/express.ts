import express, { Router } from "express";
import autoRegister from "./autoRegister";

const APP = express();
const router = express.Router();


export default async function setupExpress() {
  const PORT = process.env.PORT || 3000;
  let generated_router = autoRegister(router);
  APP.use("/", generated_router);
  APP.listen(PORT, (err) => {
    if (err) {
      console.error("There was an error starting the express server!", err);
    }
  });
}

export { router };
