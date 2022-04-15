import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
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
  public projects: Project[] | undefined;
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
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const projectIdFromRoute = Number(routeParams.get('id'));

    // Find the product that correspond with the id provided in route.
    this.project = this.projects!.find(
      (project) => project.id === projectIdFromRoute
    );
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
      this.save();
    }
  }

  // // TODO: add this info in the database and a new project will appear on the projects page.
  save() {

  }

  delete(){
    this.displayConfirm = false;
    // delete from database
    this.router.navigateByUrl('/project');
  }

  showConfirmation(){
    this.displayConfirm = true;
  }
}
const isNumeric = (val: string): boolean => {
  return !isNaN(Number(val));
}
