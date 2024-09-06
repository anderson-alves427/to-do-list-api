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
    deadline: z
      .preprocess(
        (arg) => {
          // Se o argumento é uma string ou Date, tenta converter em uma data válida
          if (typeof arg === "string" || arg instanceof Date) {
            const date = new Date(arg);
            return isNaN(date.getTime()) ? null : date;
          }
          // Retorna null para valores null ou undefined
          return arg === null || arg === undefined ? null : arg;
        },
        // Define que o valor pode ser Date, null ou undefined
        z.date().nullable().optional()
      )
      .refine((date) => date === null || !isNaN(date!.getTime()), {
        message: "Data inválida",
      }),

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

    await createTaskService.execute({ ...data, user_id: request.user.sub });
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
