import { Task } from './task';

export interface TaskList {
  id: number;
  projectId: number;
  name: string;
  tasks?: Task[];
}
