import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/objects/project';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectComponent } from '../project/project.component';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/objects/team';

@Component({
  selector: 'app-viewProjects',
  templateUrl: './viewProjects.component.html',
  styleUrls: ['./viewProjects.component.scss'],
})
export class ViewProjectsComponent implements OnInit {
  projects: Project[] | undefined;
  teams: Team[] | undefined;

  constructor(private router: Router, private projectService: ProjectService, private teamService: TeamService) {}

  ngOnInit(): void {
    this.projectService.attemptGetAll().subscribe({
      next: (result: Project[]) => {
        this.projects = result;
      },
    });
    this.teamService.attemptGetAll().subscribe({
      next: (result: Team[]) => {
        this.teams = result;
      },
    });
    console.log('getting teams', this.teams)
  }

  createProject() {
    this.router.navigateByUrl('/createNewProject');
  }

  viewProject(project: Project) {
    this.projectService.cache(project);
    this.router.navigateByUrl('/project/' + project.id);
  }

  findTeamName(teamId: number){
    const team_obj = this.teams!.find( (team) => team.id === teamId)
    return team_obj;
  }
}

