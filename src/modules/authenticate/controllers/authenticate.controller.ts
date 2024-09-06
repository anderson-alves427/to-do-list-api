import { PrismaUserRepository } from "@/modules/user/repositories/prisma/prisma-user.repository";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AuthenticateService } from "../services/authenticate/authenticate.service";
import { InvalidCredentialsError } from "../services/errors/invalid-credentials-error";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userRegisterBodySchema = z.object({
    username: z.string(),
    password: z.string(),
  });

  const data = userRegisterBodySchema.parse(request.body);

  try {
    const prismaUserRepository = new PrismaUserRepository();
    const userRegisterService = new AuthenticateService(prismaUserRepository);

    const user = await userRegisterService.execute(data);

    const token = await reply.jwtSign(
      {
        name: user.name,
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      }
    );

    return reply.status(201).send({
      ...user,
      email: undefined,
      username: undefined,
      password: undefined,
      token,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
