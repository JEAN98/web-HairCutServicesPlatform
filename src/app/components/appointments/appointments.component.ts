import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

    // Filtros mediante rango de fechas.
    public initial_date: Date;
    public end_date: Date;

    public loading: boolean;
    public is_services_view_available: boolean = false;

    // Esta lista es solo de prueba para pintar varias targetas.
    public appointment_list: any = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    // Esta lista es solo de prueba para pintar varias targetas de servicios.
    public user_services_list: any = [1,2,3,4,5];

  constructor() { }

  ngOnInit(): void {
  }

  search_appointments(){

  }

  search_user_service(){
    this.is_services_view_available = true;
  }

  cancel_services_view(){
    this.is_services_view_available = false;
  }

}
