import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { SplitterModule } from 'primeng/splitter';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProjectComponent } from './pages/project/project.component';
import { TaskListComponent } from './components/tasklist/tasklist.component';
import { TaskPreviewComponent } from './components/taskpreview/taskpreview.component';
import { TaskComponent } from './components/task/task.component';
import { RequestInterceptorService } from './services/request-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './pages/signup/signup.component';
import { ViewProjectsComponent } from './pages/viewProjects/viewProjects.component';
import { CreateProjectComponent } from './pages/createProject/createProject.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { TreeDragDropService } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { DragDropModule } from 'primeng/dragdrop';
import { CreateTeamComponent } from './pages/createTeam/createTeam.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    ViewProjectsComponent,
    ProjectComponent,
    TaskListComponent,
    TaskPreviewComponent,
    TaskComponent,
    CreateProjectComponent,
    HomepageComponent,
    CreateTeamComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    // PrimeNG
    CheckboxModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    SelectButtonModule,
    CascadeSelectModule,
    ColorPickerModule,
    DropdownModule,
    EditorModule,
    InputTextareaModule,
    InputNumberModule,
    MultiSelectModule,
    PasswordModule,
    RadioButtonModule,
    ToggleButtonModule,
    SplitButtonModule,
    AccordionModule,
    CardModule,
    DividerModule,
    PanelModule,
    SplitterModule,
    ScrollPanelModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    DialogModule,
    AvatarModule,
    AvatarGroupModule,
    OverlayPanelModule,
    FormsModule,
    ProgressSpinnerModule,
    TreeModule,
    DragDropModule,
    AutoCompleteModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true,
    },
    CookieService,
    TreeDragDropService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
