import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {}

  // TODO: validate all the text fields and save info in database. if email already exists, do not make another account.
  signUp() {
    this.router.navigateByUrl('/project');
  }
}
