import { Injectable } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { Task } from '../objects/task';
import { TaskList } from '../objects/tasklist';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpService) {}

  public getTasks(taskList: TaskList | number): Subject<Task[]> {
    let subject = new Subject<Task[]>();

    this.http
      .get(
        'tasks/' +
          (this.isTaskList(taskList) ? (taskList as TaskList).id : taskList)
      )
      .subscribe({
        next: (response: any) => {
          subject.next(response.value);
        },
      });

    return subject;
  }

  public updateTask(task: Task) {
    let subject = new Subject<Task>();

    this.http.post('tasks/update', task).subscribe({
      next: (response: any) => {
        subject.next(response.value);
      },
    });

    return subject;
  }

  public assignUserToTask(task: Task | any, username: string) {
    let subject = new Subject<Task>();

    task.username = username;

    this.http.post('tasks/assign', task).subscribe({
      next: (response: any) => {
        subject.next(response.value);
      },
    });

    return subject;
  }

  public unassignUserFromTask(task: Task | any, username: string) {
    let subject = new Subject<Task>();

    task.username = username;

    this.http.post('tasks/unassign', task).subscribe({
      next: (response: any) => {
        subject.next(response.value);
      },
    });

    return subject;
  }

  public moveTask(task: Task | any, newPriority: number) {
    let subject = new Subject<Task>();

    task.newPriority = newPriority;

    this.http.post('tasks/move', task).subscribe({
      next: (response: any) => {
        subject.next(response.value);
      },
    });

    return subject;
  }

  public createTask(task: Task) {
    return firstValueFrom(this.http.post('tasks/create', task));
  }

  public deleteTask(task: Task) {
    let subject = new Subject<boolean>();

    this.http.delete('tasks/' + task.id).subscribe({
      next: (response: any) => {
        subject.next(response.state);
      },
    });

    return subject;
  }

  public isTaskList(taskList: TaskList | number): taskList is TaskList {
    if ((taskList as TaskList).id) return true;
    return false;
  }
}
