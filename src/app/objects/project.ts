import { TaskList } from './tasklist';

export interface Project {
  id: number;
  name: string;
  taskLists: TaskList[];
}
