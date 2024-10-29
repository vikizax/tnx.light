import fastify from "fastify";
import app from "./app";
import "dotenv/config";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import fastifyMutipart from "@fastify/multipart";

(async () => {
  const server = fastify({
    logger: {
      transport:
        process.env.ENVIRONMENT === "DEV"
          ? {
              target: "pino-pretty",
              options: {
                translateTime: "HH:MM:ss Z",
                ignore: "pid,hostname",
              },
            }
          : undefined,
    },
  });

  server.register(fastifyMutipart, { limits: { fileSize: 250 * 1024 * 1024 } });

  server.register(cors, {
    preflight: true,
  });

  server.register(swagger, {
    swagger: {
      host: `0.0.0.0:${process.env.PORT}`,
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

  server.listen(
    { port: parseInt(process.env.PORT), host: "0.0.0.0" },
    (err, address) => {
      if (err)
        console.error("Encountered an error while starting the server.", err);
      else
        console.info(
          `Server running on port ${process.env.PORT} and listening for connections on ${address}`
        );
    }
  );
})();
