import { Prisma, Task } from "@prisma/client";
import { TaskRepository } from "../interfaces/task.repository";
import { prisma } from "@/lib/prisma";

export class PrismaTaskRepository implements TaskRepository {
  async create(data: Prisma.TaskUncheckedCreateInput): Promise<Task> {
    const task = await prisma.task.create({
      data,
    });

    return task;
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

  async update(
    id: string,
    data: Prisma.TaskUncheckedUpdateInput
  ): Promise<Task> {
    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        ...data,
        id,
        updated_at: new Date(),
      },
    });

    return task;
  }

  async findByUser(user_id: string): Promise<Task[]> {
    const taskSameId = await prisma.task.findMany({
      where: {
        user_id,
      },
    });

    return taskSameId;
  }

  async totalTasksByUser(id_user: string): Promise<number> {
    const total = await prisma.task.count({
      where: {
        user_id: id_user,
      },
    });

    return total;
  }
}
