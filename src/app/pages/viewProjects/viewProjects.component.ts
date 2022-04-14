import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/objects/project';
import { ProjectService, GetProjectsResponse} from 'src/app/services/project.service';

@Component({
  selector: 'app-viewProjects',
  templateUrl: './viewProjects.component.html',
  styleUrls: ['./viewProjects.component.scss']
})
export class ViewProjectsComponent implements OnInit {
  projects: Project[] | undefined;

  constructor(private router: Router, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.attemptGetAll().subscribe({
      next: (result: GetProjectsResponse) => {
        if (result == GetProjectsResponse.Success) {
          this.projects = this.projectService.getProjects();
        }
      },
    });
  }

  createProject() {
    this.router.navigateByUrl('/createNewProject');
  }

  viewProject() {
    this.router.navigateByUrl('/project/:project-id');
  }
}
