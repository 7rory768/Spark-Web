import { TreeNode } from 'primeng/api';
import { Checklist } from './checklist';
import { User } from './user';

export interface Task {
  id: number;
  projectId: number;
  listId: number;
  name: string;
  description: string;
  dateCreated?: Date;
  priority?: number;
  deadline?: Date;
  completed?: number;
  completionPoints?: number;
  checklists?: Checklist[];
  assignedUsers?: User[];
  editingName?: boolean;
}
