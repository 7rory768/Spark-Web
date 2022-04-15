import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createTeam',
  templateUrl: './createTeam.component.html',
  styleUrls: ['./createTeam.component.scss']
})
export class CreateTeamComponent implements OnInit {
  public teamName: string = '';
  public mgrUsername: string = '';
  public selectedMembers: string[] = [];
  public teamMembers: string[] = [];
  public projects: string[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private teamService: TeamService,
    // private projectService: ProjectService
  ) { }

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

  filterTeamMembers(event: any) {
  }

  createTeam() {
    this.router.navigateByUrl('/profile');
  }
}
