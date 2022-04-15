import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { Team } from 'src/app/objects/team';

@Component({
  selector: 'app-createProject',
  templateUrl: './createProject.component.html',
  styleUrls: ['./createProject.component.scss']
  
})
export class CreateProjectComponent implements OnInit {
  public projectName: string = '';
  public teamName: string = '';
  public teams: string[] = [];
  public budget: number = 0;
  // public description: string = '';

  // public teams: Team[] | undefined;

  constructor(
    private router: Router, 
    private userService: UserService,
    private teamService: TeamService,
    private projectService: ProjectService
    ) {}

  ngOnInit(): void {
    this.userService.getUserSubject().subscribe({
      next: () => {
        // this.teamService.attemptGetAll().subscribe({
        //   next: (result: Team[]) => {
        //     this.teams = result;
        //   },
        // });
      },
    });
  }


  // // TODO: add this info in the database and a new project will appear on the projects page.
  createProject(){
  //   this.projectService.attemptRegister(this.username, this.fName, this.lName, this.password, this.email).subscribe({
  //     next: (result: RegisterResponse) => {
  //       if (result == RegisterResponse.Success && this.password == this.confirmPassword) {
          this.router.navigateByUrl('/project');
  //       } else if (result == RegisterResponse.UserAlreadyExist) {
  //         // TODO: if email already exists, give an error
  //       }
  //     },
  //   });
  }
}
