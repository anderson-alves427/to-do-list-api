import { FastifyInstance } from "fastify";
import { userRegister } from "../user/controllers/user.controller";
import { authenticate } from "../authenticate/controllers/authenticate.controller";
import { verifyJWT } from "@/middlewares/verify-jwt";
import { taskRegister } from "../tasks/controllers/task.controller";
import { deleteTask } from "../tasks/controllers/delete-task.controller";
import { updateTask } from "../tasks/controllers/updateTask.controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/user", userRegister);
  app.post("/authenticate", authenticate);

  app.post("/task", taskRegister);
  app.put("/task", updateTask);
  app.delete("/task/:id", deleteTask);

  // app.post("/tarefas", {onRequest: [verifyJWT]},tarefas);
}
