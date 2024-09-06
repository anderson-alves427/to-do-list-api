import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaTaskRepository } from "../repositories/prisma/prisma-task.repository";
import { DeleteTaskService } from "../services/deleteTask/deleteTask.service";
import { ThereIsNoRegisteredTaskError } from "../services/errors/there-is-no-registered-task-error";

export async function deleteTask(request: FastifyRequest, reply: FastifyReply) {
  const deleteTaskRouteSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteTaskRouteSchema.parse(request.params);

  try {
    const prismaTaskRepository = new PrismaTaskRepository();
    const createTaskService = new DeleteTaskService(prismaTaskRepository);

    await createTaskService.execute(id);
    return reply.status(204).send();
  } catch (error) {
    if (error instanceof ThereIsNoRegisteredTaskError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
