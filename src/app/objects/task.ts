import { Checklist } from './checklist';
import { User } from './user';

export interface Task {
  id: number;
  projectId: number;
  listName: string;
  name: string;
  description: string;
  dateCreated?: Date;
  priority?: number;
  deadline?: Date;
  completed?: number;
  competionPoints?: number;
  checklists?: Checklist[];
  assignedUsers?: User[];
}
