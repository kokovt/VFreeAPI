import path from "path";
import fs from "fs";
import { Application, Router } from "express";

export default function autoRegister(app: Router, pathEndpoints: string = "Routes") {
  const routesPaths = path.join(__dirname, pathEndpoints);
  fs.readdirSync(routesPaths).forEach((file) => {
    let include = includeFile(file);

    if (fs.lstatSync(`${routesPaths}/${file}`).isDirectory()) {
      autoRegister(app, `${pathEndpoints}/${file}/`);
      return;
    };

    if (include) {
      let { path, router } = require(`./${pathEndpoints}/${file}`);
      if (!router) return;
      app.use(path, router);
    }
  });

  return app;
}

function includeFile(file: string) {
  const file_splitted = file.split(".");
  let extension = file_splitted[file_splitted.length - 1];
  return extension == "js";
}
