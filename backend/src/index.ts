import fastify from "fastify";
import app from "./app";
import "dotenv/config";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import fastifyMutipart from "@fastify/multipart";

(async () => {
  const server = fastify({
    // logger: {
    //   transport:
    //     process.env.ENVIRONMENT === "DEV"
    //       ? {
    //           target: "pino-pretty",
    //           options: {
    //             translateTime: "HH:MM:ss Z",
    //             ignore: "pid,hostname",
    //           },
    //         }
    //       : undefined,
    // },
  });

  server.register(fastifyMutipart, { limits: { fileSize: 250 * 1024 * 1024 } });

  server.register(cors, {
    origin: "*",
    // preflight: true,
  });

  server.register(swagger, {
    swagger: {
      info: { title: "LightTnx API Documentation", version: "1.0" },
      schemes: ["http"],
      consumes: ["application/json", "multipart/form-data"],
      produces: ["application/json", "application/octet-stream", "text/plain"],
    },
  });

  server.register(swaggerUI, {
    routePrefix: "/docs",
    staticCSP: true,
  });

  server.register(app);

  server.ready().then(async () => {
    console.log("ROUTEST >>", server.printRoutes());
    console.log("Server is ready 🚀🚀🚀");
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
