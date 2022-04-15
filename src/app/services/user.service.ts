import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ReplaySubject, Subject } from 'rxjs';
import { User } from '../objects/user';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User | undefined;
  public finishedLoadingFromCookie: boolean = false;
  private userSubject: ReplaySubject<User | undefined> = new ReplaySubject<
    User | undefined
  >(1);

  constructor(
    private http: HttpService,
    private cookieService: CookieService,
    private router: Router
  ) {
    console.log('userservice constructor');
    setTimeout(() => this.loadUserFromCookie(), 100);
  }

  getUser() {
    return this.user;
  }

  getUserSubject() {
    return this.userSubject;
  }

  loadUserFromCookie() {
    if (!this.user) {
      if (this.cookieService.check('spark-username')) {
        this.http.get('users').subscribe({
          next: (response: any) => {
            this.user = (response.value as User[]).find(
              (user) =>
                user.username == this.cookieService.get('spark-username')
            );
            this.userSubject.next(this.user);
            this.finishedLoadingFromCookie = true;

            if (!this.user) {
              this.router.navigateByUrl('homepage');
            }
          },
        });
      } else {
        this.finishedLoadingFromCookie = true;
        if (!this.user) {
          this.router.navigateByUrl('homepage');
        }
      }
    }
  }

  attemptLogin(username: string, password: string): Subject<LoginResponse> {
    let subject = new Subject<LoginResponse>();

    this.http.post('users/login', { username, password }).subscribe({
      next: (response: any) => {
        if (response.message == LoginResponse.Success) {
          this.user = response.value;
          this.userSubject.next(this.user);
          this.cookieService.set('spark-username', this.user!.username);
        }

        subject.next(response.message);
        return response;
      },
    });

    return subject;
  }

  attemptRegister(
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    email: string
  ): Subject<RegisterResponse> {
    let subject = new Subject<RegisterResponse>();

    this.http
      .post('users/create', { username, firstName, lastName, password, email })
      .subscribe({
        next: (response: any) => {
          if (response.message == RegisterResponse.Success) {
            this.user = response.value;
            this.userSubject.next(this.user);
            this.cookieService.set('spark-username', this.user!.username);
          }

          subject.next(response.message);
          return response;
        },
      });

    return subject;
  }

  attemptSaveChanges(username: string, firstName: string, lastName: string, password: string, email: string): Subject<SaveResponse> {
    let subject = new Subject<SaveResponse>();

    // TODO: http
    this.http.post('users/update', { username, firstName, lastName, password, email }).subscribe({
      next: (response: any) => {
        if ((response.message == SaveResponse.Success)) {
          this.user = response.value;
        }

        subject.next(response.message);
        return response;
      },
      // error: (error) => {
      //   console.log('error', error);
      //   return error;
      // },
      complete: () => { },
    });

    return subject;
  }

  attemptgetAllUsers(): Subject<User[]> {
    let subject = new Subject<User[]>();

    this.http.get('users/viewUsers').subscribe({
      next: (response: any) => {
        // if (!response.value.users) response.value.users = [];

        subject.next(response.value);
        return response;
      },
    });

    return subject;
  }
}

export enum LoginResponse {
  UnknownUser = 'Unknown user',
  IncorrectPassword = 'Incorrect password',
  Success = 'User logged in successfully',
}

export enum RegisterResponse {
  UserAlreadyExist = 'User already exists',
  Success = 'User created successfully',
}

export enum SaveResponse {
  Unsuccessful = 'User information unsuccessfully changed',
  Success = 'User information successfully changed',
}
