import express from "express";
import * as path from "path";
import { fileURLToPath } from "url";
import { newsApi } from "./api/newsApi";
import { loginApi } from "./api/loginApi";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const buildApp = () => {
  const app = express();
  const file = fileURLToPath(path.join("file://", __dirname));
  const directory = path.dirname(file);
  app.use(bodyParser.json());
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(express.static("../client/dist"));
  //app.use(express.static(, "..", "client", "dist")));

  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
      res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
      next();
    }
  });

  app.use("/api/news", newsApi());
  app.use("/api/login", loginApi());
  return app;
};

export default buildApp();
