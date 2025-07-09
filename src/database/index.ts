import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    // start your app here
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
