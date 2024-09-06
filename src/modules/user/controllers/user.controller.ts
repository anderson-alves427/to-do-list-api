import { UserRegisterService } from "./../services/userRegister/userRegister.service";
import { PrismaUserRepository } from "./../repositories/prisma/prisma-user.repository";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UsernameAlreadyExistsError } from "../services/errors/username-already-exists";
import { EmailAlreadyExistsError } from "../services/errors/email-already-exists";

export async function userRegister(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userRegisterBodySchema = z.object({
    name: z.string(),
    username: z.string(),
    password: z.string(),
    role: z.enum(["BASIC_MEMBER", "ADMIN"]).default("BASIC_MEMBER"),
    email: z.string(),
  });

  const data = userRegisterBodySchema.parse(request.body);

  try {
    const prismaUserRepository = new PrismaUserRepository();
    const userRegisterService = new UserRegisterService(prismaUserRepository);

    await userRegisterService.execute(data);
  } catch (error) {
    if (error instanceof UsernameAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    if (error instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
