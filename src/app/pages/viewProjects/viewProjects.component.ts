import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/objects/project';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { ProjectComponent } from '../project/project.component';

@Component({
  selector: 'app-viewProjects',
  templateUrl: './viewProjects.component.html',
  styleUrls: ['./viewProjects.component.scss'],
})
export class ViewProjectsComponent implements OnInit {
  projects: Project[] | undefined;

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUserSubject().subscribe({
      next: () => {
        this.projectService.attemptGetAll().subscribe({
          next: (result: Project[]) => {
            this.projects = result;
          },
        });
      },
    });
  }

  createProject() {
    this.router.navigateByUrl('/createNewProject');
  }

  viewProject(project: Project) {
    this.projectService.cache(project);
    this.router.navigateByUrl('/project/' + project.id);
  }
}
