import { Group_Task } from "@prisma/client";

export interface GroupTaskRepository {
  findById(id: string): Promise<Group_Task | null>;
}
