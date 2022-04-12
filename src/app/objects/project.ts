import { TaskList } from './tasklist';

export interface Project {
  id: number;
  teamId: number;
  name: string;
  mgrUsername: string;
  taskLists?: TaskList[];
}
