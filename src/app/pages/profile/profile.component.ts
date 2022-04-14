import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  public teams: string[] = [];

  public displayModal: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // TODO: query to modify info in the database.
  save() {
  }

  showTeamDetail() {
    this.displayModal = true;
  }

}
