import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaGroupTaskRepository } from "../repositories/prisma/prisma-group-task.repository";
import { CreateGroupTaskService } from "../services/createGroupTask/createGroupTask.service";

export async function createGroup(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteTaskRouteSchema = z.object({
    name: z.string().min(3),
  });

  const { name } = deleteTaskRouteSchema.parse(request.body);

  try {
    const prismaGroupTaskRepository = new PrismaGroupTaskRepository();
    const createGroupTaskService = new CreateGroupTaskService(
      prismaGroupTaskRepository
    );

    await createGroupTaskService.execute(name);
    return reply.status(201).send();
  } catch (error) {
    console.log(error);

    throw error;
  }
}
