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
  public mgrUsername: string = this.userService.getUser()!.username;
  public selectedMembers = [];
  public teamMembers: string[] = [];
  // public projects: string[] = [];

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
        }
      },
    });

  }

  createTeam() {
    // for (const member of this.selectedMembers) {
    //   console.log("Selected team member" + member);
    // }
    this.teamService.attemptCreateTeam(this.teamName, this.mgrUsername).subscribe({
      next: (result: Team) => {
        for (const member of this.selectedMembers) {
          console.log(member);
          this.teamService.attemptAddMembers(result.id, String(member)).subscribe({});
        }
        this.router.navigateByUrl('/profile');
      },
    });
  }
}
