import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/objects/team';
import { User } from 'src/app/objects/user';
import { CreateResponse, TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createTeam',
  templateUrl: './createTeam.component.html',
  styleUrls: ['./createTeam.component.scss'],
})
export class CreateTeamComponent implements OnInit {
  public teamName: string = '';
  public mgrUsername?: string;
  public selectedMembers = [];
  public teamMembers: string[] = [];
  // public projects: string[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private teamService: TeamService // private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.userService.getUserSubject().subscribe({
      next: (user: User) => {
        this.mgrUsername = user.username;

        this.userService.attemptgetAllUsers().subscribe({
          next: (result: User[]) => {
            for (let i = 0; i < result.length; i++) {
              if (result[i].username != user.username) {
                this.teamMembers.push(result[i].username);
              }
            }
          },
        });
      },
    });
  }

  createTeam() {
    if (this.mgrUsername) {
      this.teamService
        .attemptCreateTeam(this.teamName, this.mgrUsername)
        .subscribe({
          next: (result: Team) => {
            for (let member of this.selectedMembers) {
              this.teamService
                .attemptAddMembers(result.id, member)
                .subscribe({});
            }
            this.router.navigateByUrl('/profile');
          },
        });
    }
  }
}
