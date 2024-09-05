import fastify from "fastify";
import { userRoutes } from "./modules/user/routes/user.routes";

export const app = fastify();

app.register(userRoutes);
