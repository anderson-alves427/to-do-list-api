import { Prisma, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { UserRepository } from "../interface/user.repository";

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return userWithSameEmail;
  }

  async findByUsername(username: string): Promise<User | null> {
    const userName = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    return userName;
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const userWithSameId = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return userWithSameId;
  }
}
