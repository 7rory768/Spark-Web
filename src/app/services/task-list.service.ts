import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Project } from '../objects/project';
import { TaskList } from '../objects/tasklist';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class TaskListService {
  constructor(private http: HttpService) {}

  public getTaskLists(project: Project | number): Subject<TaskList[]> {
    let subject = new Subject<TaskList[]>();

    this.http
      .get(
        'lists/' + (this.isProject(project) ? (project as Project).id : project)
      )
      .subscribe({
        next: (response: any) => {
          subject.next(response.value);
        },
      });

    return subject;
  }

  public moveTaskList(taskList: TaskList | any, newPosition: number) {
    let subject = new Subject<TaskList>();

    taskList.newPosition = newPosition;

    this.http.post('lists/move', taskList).subscribe({
      next: (response: any) => {
        subject.next(response.value);
      },
    });

    return subject;
  }

  public createTaskList(taskList: TaskList) {
    let subject = new Subject<TaskList>();

    this.http.post('lists/create', taskList).subscribe({
      next: (response: any) => {
        subject.next(response.value);
      },
    });

    return subject;
  }

  public deleteTaskList(taskList: TaskList) {
    let subject = new Subject<boolean>();

    this.http.delete('lists/' + taskList.id).subscribe({
      next: (response: any) => {
        subject.next(response.state);
      },
    });

    return subject;
  }

  public isProject(project: Project | number): project is Project {
    if ((project as Project).id) return true;
    return false;
  }
}