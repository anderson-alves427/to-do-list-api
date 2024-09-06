import { Group_Task } from "@prisma/client";
import { GroupTaskRepository } from "../interfaces/group-task.repository";
import { prisma } from "@/lib/prisma";

export class PrismaGroupTaskRepository implements GroupTaskRepository {
  async findById(id: string): Promise<Group_Task | null> {
    const userWithSameId = await prisma.group_Task.findUnique({
      where: {
        id,
      },
    });

    return userWithSameId;
  }
}
