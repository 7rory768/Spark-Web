import { Task } from 'src/app/objects/task';

export interface TaskList {
  id: Number;
  name: string;
  tasks: Task[];
}
