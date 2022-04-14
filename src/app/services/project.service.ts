import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Project } from '../objects/project';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private allUserProjects: Project[] | undefined;

  constructor(private http: HttpService) {
    console.log('projectservice constructor');
  }

  getProjects() {
    return this.allUserProjects;
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
