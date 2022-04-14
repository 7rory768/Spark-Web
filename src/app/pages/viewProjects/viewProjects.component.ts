import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/objects/project';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectComponent } from '../project/project.component';

@Component({
  selector: 'app-viewProjects',
  templateUrl: './viewProjects.component.html',
  styleUrls: ['./viewProjects.component.scss'],
})
export class ViewProjectsComponent implements OnInit {
  projects: Project[] | undefined;

  constructor(private router: Router, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.attemptGetAll().subscribe({
      next: (result: Project[]) => {
        this.projects = result;
      },
    });
  }

  createProject() {
    this.router.navigateByUrl('/createNewProject');
  }

  viewProject(project: Project) {
    this.router.navigate([ProjectComponent, { project }]);
  }
}
