import fastify from "fastify";
import { userRoutes } from "./modules/user/routes/user.routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.register(userRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Erro dna validação de dados.",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.log(error);
  } else {
  }
});
