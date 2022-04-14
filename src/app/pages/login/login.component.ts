import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginResponse, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public username: string = '';
  public password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  // TODO: find and validate info from database.
  signIn() {
    this.userService.attemptLogin(this.username, this.password).subscribe({
      next: (result: LoginResponse) => {
        if (result == LoginResponse.Success) {
          this.router.navigateByUrl('/project');
        } else if (result == LoginResponse.UnknownUser) {
          // TODO:
        } else if (result == LoginResponse.IncorrectPassword) {
          // TODO:
        }
      },
    });
  }
}
