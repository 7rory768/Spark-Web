import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/objects/team';
import { User } from 'src/app/objects/user';
import { CreateResponse, TeamService } from 'src/app/services/team.service';
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
    this.userService.attemptgetAllUsers().subscribe({
      next: (result: User[]) => {
        for (let i = 0; i < result.length; i++) {
          this.teamMembers[i] = result[i].username;
          console.log(this.teamMembers[i]);
        }
      },
    });
  }

  createTeam() {
    this.teamService.attemptCreateTeam(this.teamName, this.mgrUsername).subscribe({
      next: (result: CreateResponse) => {
        if (result == CreateResponse.Valid) {
          this.router.navigateByUrl('/profile');
        } else if (result == CreateResponse.Invalid) {
        }
      },
    });
  }
}
