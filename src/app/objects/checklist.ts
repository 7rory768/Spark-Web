import { ChecklistItem } from './checklistItem';

export interface Checklist {
  id: number;
  taskId: number;
  title: string;
  items?: ChecklistItem[];
}
