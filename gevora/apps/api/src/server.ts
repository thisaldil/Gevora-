import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { env } from "./config/env.js";

export async function buildServer() {
  const app = Fastify({ logger: env.NODE_ENV !== "test" });

  await app.register(helmet);
  await app.register(cors, { origin: true });
  await app.register(rateLimit, { max: 100, timeWindow: "1 minute" });

  app.get("/health", async () => ({ status: "ok" }));

  app.setErrorHandler((error, _request, reply) => {
    app.log.error(error instanceof Error ? error : new Error(String(error)));
    const statusCode =
      typeof error === "object" &&
      error !== null &&
      "statusCode" in error &&
      typeof error.statusCode === "number"
        ? error.statusCode
        : 500;
    return reply.status(statusCode).send({ error: "Internal server error" });
  });

  return app;
}

if (process.env.NODE_ENV !== "test") {
  const app = await buildServer();
  await app.listen({ host: env.HOST, port: env.PORT });
}
