import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { LoginComponent }        from './components/login/login.component';
import { DashboardComponent }    from './components/dashboard/dashboard.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { ServicesComponent }     from './components/services/services.component';
import { StaffComponent }        from './components/staff/staff.component';
import { ScheduleComponent }     from './components/schedule/schedule.component';


const routes: Routes = [
  {  path: 'dashboard', component: DashboardComponent,
  children: [
    { path: '', redirectTo: 'appointments', pathMatch: 'full' },
    {  path: 'appointments', component: AppointmentsComponent  },
    {  path: 'services', component: ServicesComponent  },
    {  path: 'staff', component: StaffComponent  },
    {  path: 'schedule', component: ScheduleComponent  },
  ]
  },
  {  path: 'login', component: LoginComponent  },
  {  path: '**', pathMatch: 'full', redirectTo: 'login'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
