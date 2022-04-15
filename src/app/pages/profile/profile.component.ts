import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveResponse, UserService } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';
import { User } from '../../objects/user';
import { Team } from '../../objects/team';
import { Project } from 'src/app/objects/project';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public fName: string = '';
  public lName: string = '';
  public username: string = '';
  public point: string = '';
  public email: string = '';
  public password: string = '';
  public displayModal: boolean = false;
  // public userInfo: User | undefined;
  public teams: Team[] | undefined;
  @Input() selectedTeam?: Team;
  public projects: Project[] = [];
  public teamMembers: User[] = [];
  public deletedTeam: boolean = false;

  constructor(private userService: UserService, private router: Router, private teamService: TeamService) { }

  ngOnInit(): void {
    this.userService.getUserSubject().subscribe({
      next: () => {
        this.teamService.attemptGetAll().subscribe({
          next: (result: Team[]) => {
            this.teams = result;
          },
        });
      }
    });
  }

  showTeamDetail(team: Team) {
    this.displayModal = true;
    this.selectedTeam = team;
    this.getTeamMembers();
    this.getTeamProjects();
  }

  getTeamMembers() {
    this.userService.getUserSubject().subscribe({
      next: () => {
        this.teamService.attemptGetAllMembers(this.selectedTeam!.id).subscribe({
          next: (result: User[]) => {
            this.teamMembers = result;
          },
        });
      }
    });
  }

  getTeamProjects() {
    this.userService.getUserSubject().subscribe({
      next: () => {
        this.teamService.attemptGetAllProjects(this.selectedTeam!.id).subscribe({
          next: (result: Project[]) => {
            this.projects = result;
          },
        });
      }
    });
  }

  save() {
    this.userService.attemptSaveChanges(this.username, this.fName, this.lName, this.password, this.email).subscribe({
      next: (result: SaveResponse) => {
        if (result == SaveResponse.Success) {
          // TODO: successful pop-up message
        } else if (result == SaveResponse.Unsuccessful) {
          // TODO: unsuccessful pop-up message
        }
      },
    })
  }

  createTeam() {
    this.router.navigateByUrl('/createTeam');
  }

  editTeam() {
  }

  //TODO: need to reload the page to see the changes
  deleteTeam() {    
    this.userService.getUserSubject().subscribe({
      next: () => {
        this.teamService.attemptDeleteTeam(this.selectedTeam!.id).subscribe({
          next: (result: boolean) => {
            this.deletedTeam = result;
            this.displayModal = false;
          },
        });
      }
    });
  }
}
