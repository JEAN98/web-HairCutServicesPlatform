import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { StaffComponent } from './components/staff/staff.component';
import { ServicesComponent } from './components/services/services.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    StaffComponent,
    ServicesComponent,
    AppointmentsComponent,
    FooterComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
