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

  // attemptCreateProject(
  //   teamId: string,
  //   name: string,
  //   budget: number,
  // ): Subject<RegisterResponse> {
  //   let subject = new Subject<RegisterResponse>();

  //   this.http
  //     .post('projects/create', { teamId, name, budget })
  //     .subscribe({
  //       next: (response: any) => {
  //         if (response.message == RegisterResponse.Success) {
  //           this.user = response.value;
  //           this.userSubject.next(this.user);
  //           this.cookieService.set('spark-username', this.user!.username);
  //         }

  //         subject.next(response.message);
  //         return response;
  //       },
  //     });

  //   return subject;
  // }
}
