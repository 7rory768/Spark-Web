import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public email: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // TODO: validate enmail, save email field for the signup page
  signUp() {
    this.router.navigateByUrl('/signup');
  }
}
