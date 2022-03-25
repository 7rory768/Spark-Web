import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import WeatherForecast from './models/WeatherForecast.model';
import { environment } from 'src/environments/environment';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public forecasts: WeatherForecast[] | undefined;

  constructor(http: HttpClient, private primengConfig: PrimeNGConfig) {
    primengConfig.ripple = true;

    http
      .get<WeatherForecast[]>(environment.apiUrl + 'weatherforecast')
      .subscribe(
        (result) => {
          this.forecasts = result;
          console.log('forecasts:', this.forecasts);
        },
        (error) => console.error(error)
      );
  }
}
