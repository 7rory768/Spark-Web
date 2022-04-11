import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-createProject',
  templateUrl: './createProject.component.html',
  styleUrls: ['./createProject.component.scss']
})
export class CreateProjectComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // TODO: add this info in the database and a new project will appear on the projects page.
  createProject() {
    this.router.navigateByUrl('/project');
  }
}
