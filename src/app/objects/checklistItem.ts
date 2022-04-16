export interface ChecklistItem {
  id: number;
  checklistId: number;
  description: string;
  completed: boolean;
  editing?: boolean;
  oldDescription?: string;
}
