import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { AppoimentService } from 'src/app/services/appoiment.service';
import { TimeHelperService } from 'src/app/services/time-helper.service';

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
    public appointment_list: any = [];
    // Esta lista es solo de prueba para pintar varias targetas de servicios.
    public user_services_list: any = [1,2,3,4,5];

  constructor( private alert_service: AlertService, private appoimentService:AppoimentService,
    private timeHelper:TimeHelperService) { }

  ngOnInit(): void {
  }

  search_appointments(){
    console.log(this.initial_date.toString());
      if(this.initial_date !== undefined && this.end_date !== undefined)
      { 
        if( this.initial_date > this.end_date)
        {
          this.alert_service.swal_create_messages('center', 'error', 'La fecha de inicio debe ser menor a la fecha final', 3000);
        }
        else{
          this.appoimentService.getAppoimentList( 
            this.initial_date.toString(),
            this.end_date.toString(),
            ).toPromise()
          .then((res) => {
            this.set_appoiment_list(res);
          }).catch(err => {
            console.log(err);
          })
        }
       
      }
      else{
        this.alert_service.swal_create_messages('center', 'error', 'Debes de seleccionar las fechas para establecer el rango de búsqueda.', 3000);
      }
  }

  set_appoiment_list(res: any) {
    this.appointment_list = [];
    this.appointment_list = res;
    for (let index = 0; index < this.appointment_list.length; index++) {
      this.appointment_list[index].appoimentStatus = this.validate_appoiment_status(this.appointment_list[index].shiftStarts,this.appointment_list[index].shiftEnds);

      let startTime = (this.appointment_list[index].shiftStarts).toString().split(" ")[1];
      let endTime = (this.appointment_list[index].shiftEnds).toString().split(" ")[1];
      this.appointment_list[index].date =  (this.appointment_list[index].shiftStarts).toString().split(" ")[0];
      this.appointment_list[index].shiftStarts = this.timeHelper.convertToAmOrPMTime(startTime);
      this.appointment_list[index].shiftEnds = this.timeHelper.convertToAmOrPMTime(endTime);
    }
   // console.log(this.appointment_list );
  }

  validate_appoiment_status(shiftStarts,shiftEnds)
  {
    let startsTime = new Date(shiftStarts);
    let endsTime = new Date(shiftEnds);
    var now = new Date(Date.now());
    let colorClass = 'centerStatus';
    if(endsTime < now)
    {
      return  {
          status: 'Completada',
          color: colorClass + ' appoimentCompleted'
      }
    }
    else if(startsTime <= now && now <= endsTime)
    {
      return  {
        status: 'Activa',
        color: colorClass + ' appoimentActive'
      }
    }
    else{
      return  {
        status: 'Pendiente',
        color: colorClass + ' appoimentPeding'
      }
    }
  }

  search_user_service(){
    this.is_services_view_available = true;
  }

  cancel_services_view(){
    this.is_services_view_available = false;
  }

}
