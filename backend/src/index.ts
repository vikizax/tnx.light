import fastify from "fastify";
import app from "./app";
import "dotenv/config";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import fastifyMutipart from "@fastify/multipart";
import {
  recurringMonthlyTnxJob,
  recurringWeeklyTnxJob,
} from "./cron-jobs/recurringtnx.jobs";
import { fastifySchedule } from "@fastify/schedule";

(async () => {
  const server = fastify();

  server.register(fastifyMutipart, { limits: { fileSize: 250 * 1024 * 1024 } });

  server.register(cors, {
    origin: "*",
    preflight: true,
  });

  server.register(swagger, {
    swagger: {
      info: { title: "LightTnx API Documentation", version: "1.0" },
      schemes: ["http", "https"],
      consumes: ["application/json", "multipart/form-data"],
      produces: ["application/json", "application/octet-stream", "text/plain"],
    },
  });

  server.register(swaggerUI, {
    routePrefix: "/docs",
  });

  server.register(fastifySchedule);

  server.register(app);

  server.ready().then(async () => {
    console.log("ROUTEST >>", server.printRoutes());
    console.log("Server is ready 🚀🚀🚀");

    server.scheduler.addSimpleIntervalJob(recurringWeeklyTnxJob);
    server.scheduler.addSimpleIntervalJob(recurringMonthlyTnxJob);

    server.listen(
      { port: parseInt(process.env["PORT"] ?? "5000"), host: "0.0.0.0" },
      (error, address) => {
        if (error) {
          console.error("Server couldn't start due to: ", error.message);
          server.log.error(error);
        }

        server.log.info("Server running on " + address);
        console.log("Server running on " + address);
      }
    );
  });
})();
