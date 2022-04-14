import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-createProject',
  templateUrl: './createProject.component.html',
  styleUrls: ['./createProject.component.scss']
})
export class CreateProjectComponent implements OnInit {
  public projectName: string = '';
  public teamName: string = '';
  public teams: string[] = [];
  public description: string = '';

  constructor(private router: Router) {
    this.teams = ['Team A', 'Team B', 'Team C'];
  }

  ngOnInit(): void {
  }

  // TODO: add this info in the database and a new project will appear on the projects page.
  createProject() {
    this.router.navigateByUrl('/project');
  }
}
