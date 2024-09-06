import { TaskRepository } from "../../repositories/interfaces/task.repository";
import { UserRepository } from "@/modules/user/repositories/interface/user.repository";
import { ThereIsNoRegisteredUserError } from "../errors/there-is-no-registered-user-error";
import { GroupTaskRepository } from "@/modules/groupTask/repositories/interfaces/group-task.repository";
import { ThereIsNoRegisteredGroupError } from "../errors/there-is-no-registered-group-error";

interface CreateTaskServiceRequest {
  title: string;
  description: string;
  deadline: Date | string | undefined | null;
  group_task_id: string;
  user_id: string;
}

interface CreateTaskServiceResponse {
  id: string;
}

export class CreateTaskService {
  constructor(
    private taskRepository: TaskRepository,
    private userRepository: UserRepository,
    private groupTaskRepository: GroupTaskRepository
  ) {}

  async execute(
    data: CreateTaskServiceRequest
  ): Promise<CreateTaskServiceResponse> {
    const existsUser = await this.userRepository.findById(data.user_id);

    if (!existsUser) {
      throw new ThereIsNoRegisteredUserError();
    }

    const existsGroupTask = await this.groupTaskRepository.findById(
      data.group_task_id
    );
    console.log('asdff', existsGroupTask)
    if (!existsGroupTask) {
      throw new ThereIsNoRegisteredGroupError();
    }

    const { id } = await this.taskRepository.create(data);

    return {
      id,
    };
  }
}
