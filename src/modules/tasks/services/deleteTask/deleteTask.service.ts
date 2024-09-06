import { TaskRepository } from "../../repositories/interfaces/task.repository";
import { ThereIsNoRegisteredTaskError } from "../errors/there-is-no-registered-task-error";

export class DeleteTaskService {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string): Promise<void> {
    const existsTask = await this.taskRepository.findById(id);

    if (!existsTask) {
      throw new ThereIsNoRegisteredTaskError();
    }

    await this.taskRepository.delete(id);
  }
}
