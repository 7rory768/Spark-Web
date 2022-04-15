import { TaskList } from './tasklist';
import { Team } from './team';

export interface Project {
  id: number;
  teamId: number;
  name: string;
  mgrUsername: string;
  taskLists?: TaskList[];
  team?: Team;
}
