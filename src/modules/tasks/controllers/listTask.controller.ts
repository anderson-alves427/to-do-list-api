import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaTaskRepository } from "../repositories/prisma/prisma-task.repository";
import { ListTaskByUserService } from "../services/listTaskByUser/listTaskByUser.service";
import { PrismaGroupTaskRepository } from "@/modules/groupTask/repositories/prisma/prisma-group-task.repository";

export async function listTask(request: FastifyRequest, reply: FastifyReply) {
  const listTaskRouteSchema = z.object({
    user_id: z.string(),
    page: z.preprocess(
      (arg) => parseInt(arg as string, 10),
      z.number().positive()
    ),
    size: z.preprocess(
      (arg) => parseInt(arg as string, 10),
      z.number().positive()
    ),
  });

  const data = listTaskRouteSchema.parse(request.query);

  try {
    const prismaGroupTaskRepository = new PrismaGroupTaskRepository();
    const listTaskService = new ListTaskByUserService(
      prismaGroupTaskRepository
    );

    const result= await  listTaskService.execute(data);
    return reply.status(201).send(result);
  } catch (error) {
    console.log(error);
    return reply.status(500).send({ message: "Erro na listagem" });
  }
}
