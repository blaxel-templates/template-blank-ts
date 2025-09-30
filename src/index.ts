import '@blaxel/telemetry';
import Fastify from "fastify";

interface RequestBody {
  inputs: string;
}

async function main() {
  console.info("Booting up...");
  const app = Fastify();

  app.addHook("onRequest", async (request, reply) => {
    console.info(`${request.method} ${request.url}`);
  });

  // You can start developing your agent from this endpoint
  // You are not limited to this endpoint, you can create as many as you want
  app.post<{ Body: RequestBody }>("/", async (request, reply) => {
    return reply.send("Hello World");
  });

  const port = parseInt(process.env.BL_SERVER_PORT || "80");
  const host = process.env.BL_SERVER_HOST || "0.0.0.0";

  await app.listen({ port, host });
  console.info(`Server is running on port ${host}:${port}`);
}

main().catch(console.error);
