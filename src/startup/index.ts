import { onUnCaughtException, useErrorHandler } from "../middlewares";
import { useAppRouter } from "./router";
import bodyParser from "body-parser";
import { Express } from "express";
import { runDB } from "./runDB";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

export const startup = (app: Express) => {
  const { NODE_DOCKER_PORT, URL_LIMIT, JSON_LIMIT } = process.env;

  app.listen(NODE_DOCKER_PORT, () =>
    console.log(`Running on port ${NODE_DOCKER_PORT}`)
  );

  app.use(bodyParser.json({ limit: JSON_LIMIT }));
  app.use(cors());
  runDB();

  app.use(
    bodyParser.urlencoded({
      limit: URL_LIMIT,
      extended: false,
    })
  );

  useAppRouter(app);

  process.on("uncaughtException", onUnCaughtException);
  app.use(useErrorHandler);
};
