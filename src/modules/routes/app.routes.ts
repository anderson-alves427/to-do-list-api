import { FastifyInstance } from "fastify";
import { userRegister } from "../user/controllers/user.controller";
import { authenticate } from "../authenticate/controllers/authenticate.controller";
import { verifyJWT } from "@/middlewares/verify-jwt";
import { taskRegister } from "../tasks/controllers/task.controller";
import { deleteTask } from "../tasks/controllers/deleteTask.controller";
import { updateTask } from "../tasks/controllers/updateTask.controller";
import { listTask } from "../tasks/controllers/listTask.controller";
import { createGroup } from "../groupTask/controllers/createGroupTask.controller";
import { listGroup } from "../groupTask/controllers/listGroupTask.controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/user", userRegister);
  app.post("/authenticate", authenticate);

  app.post("/task", { onRequest: [verifyJWT] }, taskRegister);
  app.get("/task", { onRequest: [verifyJWT] }, listTask);
  app.put("/task", { onRequest: [verifyJWT] }, updateTask);
  app.delete("/task/:id", { onRequest: [verifyJWT] }, deleteTask);

  app.post("/group-task", { onRequest: [verifyJWT] }, createGroup);
  app.get("/group-task", { onRequest: [verifyJWT] }, listGroup);
}
