import { Checklist } from './checklist';

export interface Task {
  id: number;
  title: string;
  dateCreated?: Date;
  PriorityNum?: number;
  deadline?: Date;
  completed?: number;
  competionPoints?: number;
  checklists?: Checklist[];
}
