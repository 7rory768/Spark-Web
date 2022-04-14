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
  public username: string = '';
  public password: string = '';
  public confirmPassword: string = '';

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  signUp() {
    this.userService.attemptRegister(this.username, this.fName, this.lName, this.password, this.email).subscribe({
      next: (result: RegisterResponse) => {
        if (result == RegisterResponse.Success && this.password == this.confirmPassword) {
          this.router.navigateByUrl('/project');
        } else if (result == RegisterResponse.UserAlreadyExist) {
          // TODO: if email already exists, give an error
        }
      },
    });
  }
}
