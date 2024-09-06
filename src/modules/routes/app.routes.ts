import { FastifyInstance } from "fastify";
import { userRegister } from "../user/controllers/user.controller";
import { authenticate } from "../authenticate/controllers/authenticate.controller";
import { verifyJWT } from "@/middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
  app.post("/user", userRegister);
  app.post("/authenticate", authenticate);

  // app.post("/tarefas", {onRequest: [verifyJWT]},tarefas);
}
