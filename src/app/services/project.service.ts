import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
// import * as internal from 'stream';
import { Project } from '../objects/project';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private cacheList: Project[] = [];

  constructor(private http: HttpService) {
    console.log('projectservice constructor');
  }

  cache(project: Project) {
    console.log('cached: ', project);
    this.cacheList.push(project);
  }

  uncache(project: Project) {
    this.cacheList.splice(this.cacheList.indexOf(project));
  }

  getFromCache(projectId: number): Project | undefined {
    console.log('get from cache:', projectId);
    return this.cacheList.find((project) => project.id == projectId);
  }

  getCacheList(){
    return this.cacheList;
  }
  attemptGetAll(): Subject<Project[]> {
    let subject = new Subject<Project[]>();

    this.http.get('projects/viewProjects').subscribe({
      next: (response: any) => {
        if (!response.value.taskLists) response.value.taskLists = [];

        subject.next(response.value);
        return response;
      },
    });

    return subject;
  }

  get(id: number): Subject<Project> {
    let subject = new Subject<Project>();

    this.http.get('projects/' + id).subscribe({
      next: (response: any) => {
        if (!response.value.taskLists) response.value.taskLists = [];

        subject.next(response.value);
        return response;
      },
    });

    return subject;
  }

  public createTask(task: Task) {
    let subject = new Subject<Task>();

    this.http.post('tasks/create', task).subscribe({
      next: (response: any) => {
        subject.next(response.value);
      },
    });

    return subject;
  }

  attemptCreateProject(
    teamId: number,
    name: string,
    budget: number,
  ) {
    let subject = new Subject<Project>();

    this.http
      .post('projects/create', { teamId, name, budget })
      .subscribe({
        next: (response: any) => {
          subject.next(response.value);
        },
      });
    return subject;
  }

  attemptUpdateProject(
    teamId: number,
    name: string,
    budget: number
  ){
    let subject = new Subject<Project>();

    this.http
      .post('projects/update', { teamId, name, budget })
      .subscribe({
        next: (response: any) => {
          subject.next(response.value);
        },
      });
    return subject;
  }
}

export enum RegisterResponse {
  UserAlreadyExist = 'User already exists',
  Success = 'User created successfully',
}
