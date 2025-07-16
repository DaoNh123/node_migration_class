import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { router } from "./routes";
import "./database";
import { AppDataSource } from "./database/data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    // start your app here

    const app = express();
    const SERVER_PORT = process.env.SERVER_PORT;

    app.use(express.json());
    app.use(router);

    app.listen(SERVER_PORT, () =>
      console.log(`Server is running! Port: ${SERVER_PORT}`)
    );
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
