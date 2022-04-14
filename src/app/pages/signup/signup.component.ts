import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterResponse, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public fName: string = '';
  public lName: string = '';
  public email: string = '';
  public password: string = '';
  public confirmPassword: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void { }

  // TODO: validate all the text fields and save info in database. if email already exists, do not make another account.
  signUp() {
    this.router.navigateByUrl('/project');
  }
}
