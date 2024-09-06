import { Prisma, Task } from "@prisma/client";
import { TaskRepository } from "../interfaces/task.repository";
import { prisma } from "@/lib/prisma";

export class PrismaTaskRepository implements TaskRepository {
  async create(data: Prisma.TaskUncheckedCreateInput): Promise<Task> {
    const user = await prisma.task.create({
      data,
    });

    return user;
  }

  async delete(id: string): Promise<void> {
    await prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async findById(id: string): Promise<Task | null> {
    const taskSameId = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    return taskSameId;
  }
}
