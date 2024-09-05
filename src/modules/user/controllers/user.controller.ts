import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { hash } from "bcryptjs";
import { z } from "zod";

export async function userRegister(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userRegisterBodySchema = z.object({
    name: z.string(),
    username: z.string(),
    password: z.string(),
    perfil: z.string(),
    email: z.string(),
  });

  const { email, name, password, perfil, username } =
    userRegisterBodySchema.parse(request.body);

  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    return reply.status(409).send();
  }

  const userWithSameUsername = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (userWithSameUsername) {
    return reply.status(409).send();
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: password_hash,
      perfil,
      username,
    },
  });

  return reply.status(201).send();
}
