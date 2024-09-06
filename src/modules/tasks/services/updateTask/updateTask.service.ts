import { TaskRepository } from "../../repositories/interfaces/task.repository";
import { ThereIsNoRegisteredTaskError } from "../errors/there-is-no-registered-task-error";

interface UpdateTaskServiceRequest {
  id: string;
  title?: string;
  description?: string;
  deadline?: Date | string | undefined | null;
  group_task_id?: string;
}

interface UpdateTaskServiceResponse {
  id: string;
  title: string;
  description: string;
  deadline?: Date | null;
  group_task_id: string;
  user_id: string;
}

export class UpdateTaskService {
  constructor(private taskRepository: TaskRepository) {}

  async execute(
    data: UpdateTaskServiceRequest
  ): Promise<UpdateTaskServiceResponse> {
    const existsTask = await this.taskRepository.findById(data.id);

    if (!existsTask) {
      throw new ThereIsNoRegisteredTaskError();
    }

    return await this.taskRepository.update(data.id, data);
  }
}
