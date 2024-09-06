import { TasksByUser } from "@/modules/tasks/services/interfaces/tasksByUser";
import { Group_Task } from "@prisma/client";

export interface GroupTaskRepository {
  findById(id: string): Promise<Group_Task | null>;

  getTasksByUserId(
    userId: string,
    skip: number,
    take: number
  ): Promise<TasksByUser[]>;
}
