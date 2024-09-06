import { PrismaUserRepository } from "@/modules/user/repositories/prisma/prisma-user.repository";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CreateTaskService } from "../services/createTask/createTask.service";
import { PrismaTaskRepository } from "../repositories/prisma/prisma-task.repository";
import { ThereIsNoRegisteredUserError } from "../services/errors/there-is-no-registered-user-error";
import { ThereIsNoRegisteredGroupError } from "../services/errors/there-is-no-registered-group-error";
import { PrismaGroupTaskRepository } from "@/modules/groupTask/repositories/prisma/prisma-group-task.repository";
export async function taskRegister(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const taskBodySchema = z.object({
    title: z.string().max(150),
    description: z.string().max(1000),
    deadline: z.preprocess(
      (arg) =>
        typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg, // Converte string para Date
      z
        .date()
        .refine((date) => !isNaN(date.getTime()), {
          message: "Data está inválida",
        }) // Verifica se a data é válida
    ),
    user_id: z.string(),
    group_task_id: z.string(),
  });

  const data = taskBodySchema.parse(request.body);

  try {
    const prismaUserRepository = new PrismaUserRepository();
    const prismaTaskRepository = new PrismaTaskRepository();
    const prismaGroupTaskRepository = new PrismaGroupTaskRepository();
    const createTaskService = new CreateTaskService(
      prismaTaskRepository,
      prismaUserRepository,
      prismaGroupTaskRepository
    );

    await createTaskService.execute(data);
  } catch (error) {
    if (error instanceof ThereIsNoRegisteredUserError) {
      return reply.status(404).send({ message: error.message });
    }

    if (error instanceof ThereIsNoRegisteredGroupError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
