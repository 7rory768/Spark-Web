export interface Checklist {
  id: number;
  dateCreated?: Date;
  dateCompleted?: Date;
  title?: string;
  items: any[];
}
