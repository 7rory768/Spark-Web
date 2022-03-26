import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
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
import { ProjectComponent } from './pages/project/project.component';
import { TasklistComponent } from './components/tasklist/tasklist.component';
import { TaskpreviewComponent } from './components/taskpreview/taskpreview.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, ProjectComponent, TasklistComponent, TaskpreviewComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
