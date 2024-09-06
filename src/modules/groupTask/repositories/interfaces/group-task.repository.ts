import { TasksByUser } from "@/modules/tasks/services/interfaces/tasksByUser";
import { Group_Task, Prisma } from "@prisma/client";

export interface GroupTaskRepository {
  findById(id: string): Promise<Group_Task | null>;

  getTasksByUserId(
    userId: string,
    skip: number,
    take: number
  ): Promise<TasksByUser[]>;

  create(data: Prisma.Group_TaskCreateInput): Promise<Group_Task>;

  findAll(): Promise<Group_Task[]>;
}
