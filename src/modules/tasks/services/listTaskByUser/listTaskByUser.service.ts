import { GroupTaskRepository } from "@/modules/groupTask/repositories/interfaces/group-task.repository";
import { TasksByUser } from "../interfaces/tasksByUser";

interface ListTaskByUserServiceRequest {
  user_id: string;
  page: number;
  size: number;
}

export class ListTaskByUserService {
  constructor(private groupTaskRepository: GroupTaskRepository) {}

  async execute({
    page,
    size,
    user_id,
  }: ListTaskByUserServiceRequest): Promise<TasksByUser[]> {
    const skip = (page - 1) * size;
    const take = size;

    const tasks = await this.groupTaskRepository.getTasksByUserId(
      user_id,
      skip,
      take
    );

    const formattedData = tasks.map((groupTask) => ({
      id: groupTask.id,
      name: groupTask.name,
      tasks: groupTask.tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        created_at: task.created_at,
      })),
    }));

    return formattedData;
  }
}
