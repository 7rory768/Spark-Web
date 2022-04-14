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
        if ((response.message == LoginResponse.Success)) {
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

  attemptRegister(username: string, firstName: string, lastName: string, password: string, email: string): Subject<RegisterResponse> {
    let subject = new Subject<RegisterResponse>();

    // TODO: http
    this.http.post('users/create', { username, firstName, lastName, password, email }).subscribe({
      next: (response: any) => {
        if ((response.message == RegisterResponse.Success)) {
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
