import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  signUp() {
    this.router.navigateByUrl('/signup');
  }

}
