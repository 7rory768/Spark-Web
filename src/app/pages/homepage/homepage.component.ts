import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public email: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void { }

  signUp() {
    this.router.navigateByUrl('/signup?email=' + this.email);
  }
}
