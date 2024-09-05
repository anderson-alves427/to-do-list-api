import { FastifyInstance } from "fastify";
import { userRegister } from "../user/controllers/user.controller";
import { authenticate } from "../authenticate/controllers/authenticate.controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/user", userRegister);
  app.post("/authenticate", authenticate);
}
