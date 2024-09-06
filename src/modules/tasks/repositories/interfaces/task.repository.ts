import { Prisma, Task } from "@prisma/client";
import { TasksByUser } from "../../services/interfaces/tasksByUser";

export interface TaskRepository {
  create(data: Prisma.TaskUncheckedCreateInput): Promise<Task>;

  delete(id: string): Promise<void>;

  findById(id: string): Promise<Task | null>;

  update(id: string, data: Prisma.TaskUncheckedUpdateInput): Promise<Task>;

  findByUser(user_id: string): Promise<Task[]>;

  getTasksByUserId(
    userId: string,
    skip: number,
    take: number
  ): Promise<TasksByUser[]>;
}
