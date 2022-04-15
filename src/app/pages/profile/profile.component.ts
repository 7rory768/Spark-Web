import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveResponse, UserService } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';
import { User } from '../../objects/user';
import { Team } from '../../objects/team';

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
  public userInfo: User | undefined;
  public teams: Team[] | undefined;

  constructor(private userService: UserService, private router: Router, private teamService: TeamService) { }

  ngOnInit(): void {
    // this.userService.getUser().subscribe({
    //   next: (result: User) => {
    //     this.userInfo = result;
    //   }
    // });
  }

  showTeamDetail() {
    this.displayModal = true;
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
}
