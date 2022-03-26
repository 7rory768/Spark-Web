import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  nav: boolean = false;

  constructor(private primengConfig: PrimeNGConfig, private router: Router) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        console.log(val);
        this.nav = val.urlAfterRedirects !== '/login';
      }
    });
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  showNav() {
    return this.nav;
  }
}
