import { Prisma, Task } from "@prisma/client";

export interface TaskRepository {
  create(data: Prisma.TaskUncheckedCreateInput): Promise<Task>;

  delete(id: string): Promise<void>;

  findById(id: string): Promise<Task | null>;
}
