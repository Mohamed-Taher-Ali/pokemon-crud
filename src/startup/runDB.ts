import mongoose from "mongoose";

export const runDB = (callback?: () => void) => {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

  const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

  mongoose
    .connect(url)
    .then(() => {
      callback?.();
      if (!callback) console.log("Connection To MongoDB ...");
    })
    .catch((err) => console.error("error When Connecting to MongoDB...", err));
};
