import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public get(endpoint: string, body: any = {}) {
    return this.http.get(environment.apiUrl + endpoint, body);
  }

  public post(endpoint: string, body: any) {
    return this.http.post(environment.apiUrl + endpoint, body);
  }

  public put(endpoint: string, body: any) {
    return this.http.put(environment.apiUrl + endpoint, body);
  }

  public delete(endpoint: string, body: any = {}) {
    return this.http.delete(environment.apiUrl + endpoint, body);
  }
}
