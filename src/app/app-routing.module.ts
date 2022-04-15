import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProjectComponent } from './pages/project/project.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ViewProjectsComponent } from './pages/viewProjects/viewProjects.component';
import { CreateProjectComponent } from './pages/createProject/createProject.component';
import { CreateTeamComponent } from './pages/createTeam/createTeam.component';
import { RouteGuardService } from './services/route-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'createTeam',
    component: CreateTeamComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'project',
    component: ViewProjectsComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'createProject',
    component: CreateProjectComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'project/:project-id',
    component: ProjectComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'project/:project-id/task/:task-id',
    component: ProjectComponent,
    canActivate: [RouteGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
