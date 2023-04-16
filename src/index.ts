import Hapi from "@hapi/hapi";
import { routes } from "./routes/routes";
import * as dotenv from "dotenv";
import * as path from "path";

const init = async () => {
  dotenv.config({ path: path.join(__dirname + "/../.env") });

  const server = Hapi.server({
    port: process.env.PORT,
    host: "localhost"
  });

  server.route(routes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init().then(() => console.log("Server started"));
