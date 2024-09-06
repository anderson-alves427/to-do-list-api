import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaTaskRepository } from "../repositories/prisma/prisma-task.repository";
import { UpdateTaskService } from "../services/updateTask/updateTask.service";
import { ThereIsNoRegisteredTaskError } from "../services/errors/there-is-no-registered-task-error";

export async function updateTask(request: FastifyRequest, reply: FastifyReply) {
  const updateTaskRouteSchema = z.object({
    id: z.string(),
    title: z.optional(z.string()),
    description: z.optional(z.string()),
    deadline: z.optional(z.date()),
    group_task_id: z.optional(z.string()),
    user_id: z.optional(z.string()),
  });

  const data = updateTaskRouteSchema.parse(request.body);

  try {
    const prismaTaskRepository = new PrismaTaskRepository();
    const updateTaskService = new UpdateTaskService(prismaTaskRepository);

    await updateTaskService.execute(data);
    return reply.status(203).send();
  } catch (error) {
    if (error instanceof ThereIsNoRegisteredTaskError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}