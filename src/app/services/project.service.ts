import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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

    // TODO: htt
    this.http.get('projects/viewProjects', {}).subscribe({
      next: (response: any) => {
        subject.next(response.value);
        return response;
      },
      // error: (error) => {
      //   console.log('error', error);
      //   return error;
      // },
      complete: () => {},
    });

    return subject;
  }
}
