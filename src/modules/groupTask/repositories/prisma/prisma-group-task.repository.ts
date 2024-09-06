import { Group_Task, Prisma } from "@prisma/client";
import { GroupTaskRepository } from "../interfaces/group-task.repository";
import { prisma } from "@/lib/prisma";
import { TasksByUser } from "@/modules/tasks/services/interfaces/tasksByUser";

export class PrismaGroupTaskRepository implements GroupTaskRepository {
  async findById(id: string): Promise<Group_Task | null> {
    const groupWithSameId = await prisma.group_Task.findUnique({
      where: {
        id,
      },
    });

    return groupWithSameId;
  }

  async getTasksByUserId(
    userId: string,
    skip: number,
    take: number
  ): Promise<TasksByUser[]> {
    const tasks = await prisma.group_Task.findMany({
      where: {
        tasks: {
          some: {
            user_id: userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        tasks: {
          where: {
            user_id: userId,
          },
          select: {
            id: true,
            title: true,
            description: true,
            deadline: true,
            created_at: true,
          },
        },
      },
      skip,
      take,
    });

    return tasks;
  }

  async create(data: Prisma.Group_TaskCreateInput): Promise<Group_Task> {
    const group = await prisma.group_Task.create({
      data,
    });

    return group;
  }

  async findAll(): Promise<Group_Task[]> {
    const groups = await prisma.group_Task.findMany();

    return groups;
  }
}
