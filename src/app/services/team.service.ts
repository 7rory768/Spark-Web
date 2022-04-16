import { Injectable } from '@angular/core';
import { Team } from '../objects/team';
import { User } from '../objects/user';
import { Observable, Subject } from 'rxjs';
import { HttpService } from './http.service';
import { Project } from '../objects/project';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private cacheList: Team[] = [];
  private team: Team | undefined;

  constructor(private http: HttpService) {
    console.log('teamservice constructor');
  }

  cache(team: Team) {
    console.log('cached: ', team);
    this.cacheList.push(team);
  }

  uncache(team: Team) {
    this.cacheList.splice(this.cacheList.indexOf(team), 1);
  }

  getFromCache(id: number): Team | undefined {
    console.log('get from cache:', id);
    return this.cacheList.find((team) => team.id == id);
  }

  getCacheList() {
    return this.cacheList;
  }

  attemptGetAll(): Subject<Team[]> {
    let subject = new Subject<Team[]>();

    this.http.get('teams/viewTeams', {}).subscribe({
      next: (response: any) => {
        subject.next(response.value);
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

  attemptGetAllMembers(id: number): Subject<User[]> {
    let subject = new Subject<User[]>();

    this.http.get('teams/' + id).subscribe({
      next: (response: any) => {
        subject.next(response.value);
        return response;
      },
    });
    return subject;
  }

  attemptGetAllProjects(id: number): Subject<Project[]> {
    let subject = new Subject<Project[]>();

    this.http.get('projects/team/' + id).subscribe({
      next: (response: any) => {
        subject.next(response.value);
        return response;
      },
    });
    return subject;
  }

  attemptDeleteTeam(id: number): Subject<boolean> {
    let subject = new Subject<boolean>();

    this.http.delete('teams/delete/' + id).subscribe({
      next: (response: any) => {
        subject.next(response.state);
        return response;
      },
    });
    return subject;
  }

  attemptCreateTeam(name: string, mgrUsername: string): Subject<Team> {
    let subject = new Subject<Team>();

    this.http.post('teams/create', { name, mgrUsername }).subscribe({
      next: (response: any) => {
        // if ((response.message == CreateResponse.Valid)) {
        //   this.team = response.value;
        // }
        subject.next(response.value);
        return response;
      },
    });
    return subject;
  }

  attemptAddMembers(id: number, username: string): Subject<boolean> {
    let subject = new Subject<boolean>();

    this.http.post('teams/addMember', { id, username }).subscribe({
      next: (response: any) => {
        // if ((response.message == CreateResponse.Valid)) {
        //   this.team = response.value;
        // }
        subject.next(response.state);
        return response;
      },
    });
    return subject;
  }
}

export enum CreateResponse {
  Valid = 'Created team successfully',
  Invalid = 'Failed to create team',
}
