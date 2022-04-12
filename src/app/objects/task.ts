import { Checklist } from './checklist';

export interface Task {
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
}
