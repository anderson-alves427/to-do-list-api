import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaGroupTaskRepository } from "../repositories/prisma/prisma-group-task.repository";
import { ListGroupTaskService } from "../services/listGroupTask/listGroupTask.service";

export async function listGroup(request: FastifyRequest, reply: FastifyReply) {
  try {
    const prismaGroupTaskRepository = new PrismaGroupTaskRepository();
    const listGroupTaskService = new ListGroupTaskService(
      prismaGroupTaskRepository
    );

    const result = await listGroupTaskService.execute();
    return reply.status(200).send(result);
  } catch (error) {
    console.log(error);

    throw error;
  }
}
