import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProjectComponent } from './pages/project/project.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ViewProjectsComponent } from './pages/viewProjects/viewProjects.component';
import { CreateProjectComponent } from './pages/createProject/createProject.component';

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'project', component: ViewProjectsComponent },
  { path: 'createNewProject', component: CreateProjectComponent },
  { path: 'project/:project-id', component: ProjectComponent },
  { path: 'project/:project-id/task/:task-id', component: ProjectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
