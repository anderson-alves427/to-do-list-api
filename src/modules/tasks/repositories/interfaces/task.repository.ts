import { Prisma, Task } from "@prisma/client";

export interface TaskRepository {
  create(data: Prisma.TaskUncheckedCreateInput): Promise<Task>;
}
