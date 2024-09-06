import { GroupTaskRepository } from "../../repositories/interfaces/group-task.repository";

interface ListGroupTaskServiceResponse {
  id: string;
  name: string;
}

export class ListGroupTaskService {
  constructor(private groupTaskRepository: GroupTaskRepository) {}

  async execute(): Promise<ListGroupTaskServiceResponse[]> {
    return await this.groupTaskRepository.findAll();
  }
}
