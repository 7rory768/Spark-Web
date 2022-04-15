import { TreeNode } from 'primeng/api';
import { Checklist } from './checklist';
import { User } from './user';

export interface Task extends TreeNode {
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
