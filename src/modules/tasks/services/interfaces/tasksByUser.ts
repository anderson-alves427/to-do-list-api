export interface TasksByUser {
  name: string;
  id: string;
  tasks: {
    id: string;
    title: string;
    description: string;
    deadline: Date | null;
    created_at: Date;
  }[];
}
