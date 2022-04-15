import { TreeNode } from 'primeng/api';
import { Task } from './task';

export interface TaskList extends TreeNode<TaskList> {
  id: number;
  projectId: number;
  name: string;
  position: number;
  tasks?: Task[];
}
