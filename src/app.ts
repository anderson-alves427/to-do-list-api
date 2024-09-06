import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { appRoutes } from "./modules/routes/app.routes";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";

export const app = fastify();

app.register(fastifyCors, {
  origin: true, // Permite qualquer origem
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Métodos permitidos
  credentials: true, // Se você quiser habilitar o envio de cookies ou credenciais
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(appRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Erro na validação de dados.",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.log(error);
  }
});
