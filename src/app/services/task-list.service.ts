import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { Project } from '../objects/project';
import { TaskList } from '../objects/tasklist';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class TaskListService {
  constructor(private http: HttpService) {}

  private isMovingTaskLists: (Project | number)[] = [];

  public isMovingTaskList(project: Project | number): boolean {
    return this.isMovingTaskLists.includes(project);
  }

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
        error: (response) => {
          subject.error(response.error);
        },
      });

    return subject;
  }

  public updateTaskList(taskList: TaskList): Promise<any> {
    console.log('update task list');
    return firstValueFrom(this.http.post('lists/update', taskList));
  }

  public moveTaskList(taskList: TaskList | any, newPosition: number) {
    this.isMovingTaskLists.push(taskList.projectId);

    let subject = new Subject<TaskList>();

    taskList.newPosition = newPosition;

    this.http.post('lists/move', taskList).subscribe({
      next: (response: any) => {
        subject.next(response.value);
        this.isMovingTaskLists.splice(
          this.isMovingTaskLists.indexOf(taskList.projectId)
        );
      },
      error: (response) => {
        subject.error(response.error);
      },
    });

    return subject;
  }

  public createTaskList(taskList: TaskList): Promise<any> {
    return firstValueFrom(this.http.post('lists/create', taskList));
  }

  public deleteTaskList(taskList: TaskList) {
    let subject = new Subject<boolean>();

    this.http.delete('lists/' + taskList.id).subscribe({
      next: (response: any) => {
        subject.next(response.state);
      },
      error: (response) => {
        subject.error(response.error);
      },
    });

    return subject;
  }

  public isProject(project: Project | number): project is Project {
    if ((project as Project).id) return true;
    return false;
  }
}
