import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../objects/user';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User | undefined;

  constructor(private http: HttpService) {
    console.log('userservice constructor');
  }

  getUser() {
    return this.user;
  }

  attemptLogin(username: string, password: string): Subject<LoginResponse> {
    let subject = new Subject<LoginResponse>();

    // TODO: http
    this.http.post('users/login', { username, password }).subscribe({
      next: (response: any) => {
        if ((response.message = LoginResponse.Success)) {
          this.user = response.value;
        }

        subject.next(response.message);
        return response;
      },
      // error: (error) => {
      //   console.log('error', error);
      //   return error;
      // },
      complete: () => {},
    });

    return subject;
  }

  attemptRegister(username: string, password: string): Observable<User> {
    let obs = new Observable<User>();

    // TODO: http

    return obs;
  }
}

export enum LoginResponse {
  UnknownUser = 'Unknown user',
  IncorrectPassword = 'Incorrect password',
  Success = 'User logged in successfully',
}

export enum RegisterResponse {
  UserAlreadyExists,
  Success,
}
