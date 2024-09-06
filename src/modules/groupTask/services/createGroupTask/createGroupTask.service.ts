import { GroupTaskRepository } from "../../repositories/interfaces/group-task.repository";

interface CreateGroupTaskServiceResponse {
  id: string;
  name: string;
}

export class CreateGroupTaskService {
  constructor(private groupTaskRepository: GroupTaskRepository) {}

  async execute(name: string): Promise<CreateGroupTaskServiceResponse> {
    return await this.groupTaskRepository.create({ name });
  }
}
