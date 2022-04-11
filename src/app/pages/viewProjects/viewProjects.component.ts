import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-viewProjects',
  templateUrl: './viewProjects.component.html',
  styleUrls: ['./viewProjects.component.scss']
})
export class ViewProjectsComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createProject() {
    this.router.navigateByUrl('/createNewProject');
  }
}
