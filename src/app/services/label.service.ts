import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Label } from '../objects/label';
import { Project } from '../objects/project';
import { TaskList } from '../objects/tasklist';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class LabelService {
  constructor(private http: HttpService) {}

  public getLabels(project: Project | number): Subject<Label[]> {
    let subject = new Subject<Label[]>();

    this.http
      .get(
        'labels/' +
          (this.isProject(project) ? (project as Project).id : project)
      )
      .subscribe({
        next: (response: any) => {
          subject.next(response.value);
        },
      });

    return subject;
  }

  public createLabel(label: Label) {
    let subject = new Subject<Label>();

    this.http.post('labels/create', label).subscribe({
      next: (response: any) => {
        subject.next(response.value);
      },
    });

    return subject;
  }

  public deleteLabel(label: Label) {
    let subject = new Subject<boolean>();

    this.http.delete('labels/' + label.id).subscribe({
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
