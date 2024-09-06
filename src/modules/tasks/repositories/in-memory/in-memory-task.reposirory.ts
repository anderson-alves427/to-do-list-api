import { Prisma, Task } from "@prisma/client";
import { TaskRepository } from "../interfaces/task.repository";
import { randomUUID } from "node:crypto";

export class InMemoryTaskRepository implements TaskRepository {
  public items: Task[] = [];

  async create(data: Prisma.TaskUncheckedCreateInput) {
    const task = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      deadline: data.deadline instanceof Date ? data.deadline : null,
      group_task_id: data.group_task_id,
      user_id: data.user_id,
      created_at: new Date(),
      updated_at: null,
    };

    this.items.push(task);
    return task;
  }
}
