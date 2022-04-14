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

  public isProject(project: Project | number): project is Project {
    if ((project as Project).id) return true;
    return false;
  }
}
