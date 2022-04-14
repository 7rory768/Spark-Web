import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class RequestInterceptorService implements HttpInterceptor {
  // https://jasonwatmore.com/post/2021/09/24/angular-http-interceptor-to-set-auth-header-for-api-requests-if-user-logged-in

  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.userService.getUser();
    const isLoggedIn = user?.username;

    const isApiUrl = request.url.startsWith(environment.apiUrl);

    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `${user.username}` },
      });
    }

    return next.handle(request);
  }
}
