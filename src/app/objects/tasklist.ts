import { Task } from './task';

export interface TaskList {
  projectId: number;
  id: Number;
  name: string;
  tasks?: Task[];
}
