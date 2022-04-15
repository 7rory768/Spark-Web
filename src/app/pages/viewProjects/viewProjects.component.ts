import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/objects/project';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
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

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private userService: UserService,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.userService.getUserSubject().subscribe({
      next: () => {
        this.projectService.attemptGetAll().subscribe({
          next: (result: Project[]) => {
            this.projects = result;
            if (this.teams) {
              for (let p of this.projects) {
                p.team = this.teams.find((team) => team.id === p.teamId)
              }
            }
          },
        });
        this.teamService.attemptGetAll().subscribe({
          next: (result: Team[]) => {
            this.teams = result;
            if (this.projects) {
              for (let p of this.projects) {
                p.team = this.teams.find((team) => team.id === p.teamId)
              }
            }
          },
        });
      },
    });
  }

  createProject() {
    this.router.navigateByUrl('/createProject');
  }

  viewProject(project: Project) {
    this.projectService.cache(project);
    this.router.navigateByUrl('/project/' + project.id);
  }

  findTeamName(teamid: number) {

  }
}