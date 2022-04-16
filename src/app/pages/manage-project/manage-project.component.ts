import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Subject } from 'rxjs';
import { Project } from 'src/app/objects/project';
import { Team } from 'src/app/objects/team';
import { ProjectService } from 'src/app/services/project.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrls: ['./manage-project.component.scss']
})
export class ManageProjectComponent implements OnInit {
  public teams: Team[] = this.teamService.getCacheList();
  // public projects: Project[] | undefined;
  public project: Project | undefined;

  // For the new data to save on modification
  public projectName: string = '';
  public teamName: Team | undefined;
  public budget: string = '0';
  public warningMsg: string = '';

  // For popup deletion confirmation
  displayConfirm: boolean = false;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private teamService: TeamService,
    private projectService: ProjectService,
  ) { }

  // get the project 
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params: ParamMap) => {
        let projectId = parseInt(params.get('project-id')!);

        this.userService.getUserSubject().subscribe({
          next: () => {
            this.project = this.projectService.getFromCache(projectId);

            if (!this.project) {
              this.projectService.get(projectId).subscribe({
                next: (project) => {
                  this.project = project;
                  this.onLoadedProject();
                },
              });
            } else {
              this.onLoadedProject();
            }
          },
        });
      },
    });
  }

  // get teams
  onLoadedProject() {
    this.teamService.attemptGetAll().subscribe({
      next: (result: Team[]) => {
        this.project!.team = result.find(
          (team) => team.id === this.project!.teamId
        );
        this.teams = result;
      },
    });
  }

  checkInput() {
    console.log("Project name: ", this.projectName);

    if (this.projectName.length == 0) {
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
      this.save();
    }
  }

  // // TODO: add this info in the database and a new project will appear on the projects page.
  save() {
    // let subject = new Subject<Project>();
    this.projectService.attemptUpdateProject(this.project!.id, this.teamName!.id, this.projectName, Number(this.budget)).subscribe({
      next: (result: Project) => {
        if (result != null) {
          this.warningMsg = "Changes Saved!"
          this.ngOnInit();
        }
        else {
          this.warningMsg = "Failure to save changes..."
        }
      },
    });
  }

  delete() {
    this.displayConfirm = false;
    // let subject = new Subject<Project>();
    this.projectService.attemptDelete(this.project!.id, this.teamName!.id).subscribe({
      next: (result: Boolean) => {
        if (result == true) {
          this.router.navigateByUrl('/project');
        }
        else {
          this.warningMsg = "Failure to delete project..."
        }
      },
    });
  }

  showConfirmation() {
    this.displayConfirm = true;
  }
}

const isNumeric = (val: string): boolean => {
  return !isNaN(Number(val));
}

