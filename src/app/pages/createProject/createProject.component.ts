import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { Team } from 'src/app/objects/team';
import { Subject } from 'rxjs';
// import { runInThisCon text } from 'vm';

@Component({
  selector: 'app-createProject',
  templateUrl: './createProject.component.html',
  styleUrls: ['./createProject.component.scss']

})
export class CreateProjectComponent implements OnInit {
  public projectName: string = '';
  public teamName: Team | undefined;
  public budget: string = '0';
  public warningMsg: string = '';


  constructor(
    private router: Router,
    private userService: UserService,
    private teamService: TeamService,
    private projectService: ProjectService
  ) { }

  public teams: Team[] = this.teamService.getCacheList();

  ngOnInit(): void {
    this.userService.getUserSubject().subscribe({
      next: () => {
        this.teamService.attemptGetAll().subscribe({
          next: (result: Team[]) => {
            this.teams = result;
          },
        });
      },
    });
  }


  // // TODO: add this info in the database and a new project will appear on the projects page.
  createProject() {
    let subject = new Subject<CreateResponse>();
    this.projectService.attemptCreateProject(this.teamName!.id, this.projectName, Number(this.budget)).subscribe({
      next: (result: any) => {
        if (result == CreateResponse.NotManager) {
          this.warningMsg = "Invalid permissions: you are not a manager for the selected team."
        }
        else{
          this.router.navigateByUrl('/project');
        }
      },
    });
  }

  checkInput() {
    if (this.projectName == '') {
      this.warningMsg = "Project name empty. Please fill in the feild.";
    }
    if (this.projectName.length > 20) {
      this.warningMsg = "Project name cannot exceed 20 characters."
    }
    else if (isNumeric(this.budget) == false) {
      this.warningMsg = "Budget invalid: please input a valid whole number.";
    }
    else {
      this.warningMsg = "";
      this.createProject();
    }
  }
}

const isNumeric = (val: string) : boolean => {
  return !isNaN(Number(val));
}

export enum CreateResponse{
  NotManager = 'User does not have permissions to create a project!',
  Success = 'Created project successfully',
}