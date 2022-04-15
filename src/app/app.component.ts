import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { HttpService } from './services/http.service';
import { RequestInterceptorService } from './services/request-interceptor.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Spark';
  nav: boolean = false;
  navWidth: string = '0';

  // UserService must be injected so that it is always active
  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private userService: UserService
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        console.log(val);
        this.nav =
          val.urlAfterRedirects !== '/project' &&
          val.urlAfterRedirects !== '/profile' &&
          val.urlAfterRedirects !== '/createTeam' &&
          val.urlAfterRedirects !== '/createProject' &&
          val.urlAfterRedirects !== '/project/:project-id' &&
          val.urlAfterRedirects !== '/project/:project-id/task/:task-id' &&
          val.urlAfterRedirects !== '/project/:project-id/manageProject';

        var widthInterval = setInterval(() => {
          this.navWidth =
            document.getElementById('navcard')?.clientWidth + 'px';
          if (this.navWidth !== 'undefinedpx') clearInterval(widthInterval);
        }, 50);
      }
    });
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  showNavBeforeLogIn() {
    return this.nav;
  }

  showNavAfterLogIn() {
    return !this.nav;
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }
}
