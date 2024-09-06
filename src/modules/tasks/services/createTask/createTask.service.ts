import bcryptjs from "bcryptjs";
import { TaskRepository } from "../../repositories/interfaces/task.repository";
import { UserRepository } from "@/modules/user/repositories/interface/user.repository";
import { ThereIsNoRegisteredUserError } from "../errors/there-is-no-registered-user-error";

interface CreateTaskServiceRequest {
  title: string;
  description: string;
  deadline: Date | string | undefined | null;
  username: string;
  group_task_id: string;
  user_id: string;
}

interface CreateTaskServiceResponse {
  id: string;
}

export class CreateTaskService {
  constructor(
    private taskRepository: TaskRepository,
    private userRepository: UserRepository
  ) {}

  async execute(
    data: CreateTaskServiceRequest
  ): Promise<CreateTaskServiceResponse> {
    const existsUser = await this.userRepository.findById(data.user_id);

    if (!existsUser) {
      throw new ThereIsNoRegisteredUserError();
    }

    const { id } = await this.taskRepository.create(data);

    return {
      id,
    };
  }
}
