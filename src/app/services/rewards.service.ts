import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../objects/user';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class RewardsService {
  constructor(private http: HttpService) {}

  getPoints() {
    return firstValueFrom(this.http.get('rewards/user'));
  }

  getPointsWithinTeam(user: User, teamId: number) {
    return firstValueFrom(this.http.post('rewards/team/' + teamId, user));
  }

  rewardUser(user: User, numPoints: number, teamId: number, projectId: number) {
    return firstValueFrom(this.http.post('rewardUser' + teamId, user));
  }
}
