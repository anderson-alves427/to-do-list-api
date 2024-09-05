import { FastifyInstance } from "fastify";
import { userRegister } from "../controllers/user.controller";

export async function userRoutes(app: FastifyInstance) {
  app.post("/user", userRegister);
}
