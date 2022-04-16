import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaveResponse, UserService } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';
import { User } from '../../objects/user';
import { Team } from '../../objects/team';
import { Project } from 'src/app/objects/project';
import { RewardsService } from 'src/app/services/rewards.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public fName?: string;
  public lName?: string;
  public username?: string;
  public email?: string;
  public password?: string;
  public totalPoints: number = 0;
  public displayModal: boolean = false;
  public teams: Team[] | undefined;
  @Input() selectedTeam?: Team;
  public projects: Project[] = [];
  public teamMembers: User[] = [];
  public deletedTeam: boolean = false;
  points?: number;
  loadingMembers: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private teamService: TeamService,
    private rewardsService: RewardsService
  ) {}

  ngOnInit(): void {
    this.userService.getUserSubject().subscribe({
      next: (user: User) => {
        this.fName = user.fName;
        this.lName = user.lName;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;

        this.teamService.attemptGetAll().subscribe({
          next: (result: Team[]) => {
            this.teams = result;
          },
        });

        this.rewardsService.getPoints().then((response: any) => {
          this.points = response.value;
        });
      },
    });
  }

  showTeamDetail(team: Team) {
    this.displayModal = true;
    this.selectedTeam = team;
    this.getTeamMembers();
    this.getTeamProjects();
  }

  getTeamMembers() {
    this.loadingMembers = true;
    this.userService.getUserSubject().subscribe({
      next: () => {
        this.teamService.attemptGetAllMembers(this.selectedTeam!.id).subscribe({
          next: (result: User[]) => {
            for (let user of result) {
              this.rewardsService
                .getPointsWithinTeam(user, this.selectedTeam!.id)
                .then((response: any) => {
                  user.pointsOnTeam = response.value;

                  if (
                    !result.find(
                      (otherUser) => otherUser.pointsOnTeam == undefined
                    )
                  ) {
                    this.loadingMembers = false;
                    this.teamMembers = result;
                  }
                });
            }
          },
        });
      },
    });
  }

  getTeamProjects() {
    this.userService.getUserSubject().subscribe({
      next: () => {
        this.teamService
          .attemptGetAllProjects(this.selectedTeam!.id)
          .subscribe({
            next: (result: Project[]) => {
              this.projects = result;
            },
          });
      },
    });
  }

  save() {
    if (
      this.username &&
      this.fName &&
      this.lName &&
      this.password &&
      this.email
    ) {
      this.userService
        .attemptSaveChanges(
          this.username,
          this.fName,
          this.lName,
          this.password,
          this.email
        )
        .subscribe({
          next: (result: SaveResponse) => {
            if (result == SaveResponse.Success) {
              // TODO: successful pop-up message
            } else if (result == SaveResponse.Unsuccessful) {
              // TODO: unsuccessful pop-up message
            }
          },
        });
    }
  }

  createTeam() {
    this.router.navigateByUrl('/createTeam');
  }

  editTeam() {}

  deleteTeam() {
    this.teamService.attemptDeleteTeam(this.selectedTeam!.id).subscribe({
      next: (result: boolean) => {
        this.teams?.splice(
          this.teams.findIndex(
            (otherTeam) => otherTeam.id === this.selectedTeam?.id
          ),
          1
        );
        this.deletedTeam = result;
        this.displayModal = false;
      },
    });
  }
}
