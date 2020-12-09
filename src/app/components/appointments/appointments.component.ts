import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { AppoimentResourceService } from 'src/app/services/appoiment-resource.service';
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
    public sppinerClass:String = '';

    public loading: boolean;
    public is_services_view_available: boolean = false;
    public current_client_name:String = '';

    public appoiment_message:String = 'Seleccione el rango de fechas para ver las citas';
    // Esta lista es solo de prueba para pintar varias targetas.
    public appoiment_list: any = [];
    // Esta lista es solo de prueba para pintar varias targetas de servicios.
    public appoiment_services_list: any = [];

  constructor( private alert_service: AlertService, 
    private appoimentService:AppoimentService,
    private appoimentResource:AppoimentResourceService,
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
          this.active_sppiner();
          this.appoimentService.getAppoimentList( 
            this.initial_date.toString(),
            this.end_date.toString(),
            ).toPromise()
          .then((res) => {
            this.set_appoiment_list(res);
            this.pause_sppiner();
          }).catch(err => {
            console.log(err);
            this.pause_sppiner();
          })
        }
       
      }
      else{
        this.alert_service.swal_create_messages('center', 'error', 'Debe de seleccionar las fechas para establecer el rango de búsqueda.', 3000);
      }
  }

  active_sppiner()
  {
    this.sppinerClass = 'spinner-border';
  }

  pause_sppiner()
  {
    this.sppinerClass = '';
  }


  set_appoiment_list(res: any) {
    this.appoiment_list = [];
    this.appoiment_list = res;
    this.appoiment_message = 'Opss... No se encontaron citas para el rango de fechas selecionado';
    for (let index = 0; index < this.appoiment_list.length; index++) {
      this.appoiment_list[index].appoimentStatus = this.validate_appoiment_status(this.appoiment_list[index].shiftStarts,this.appoiment_list[index].shiftEnds);

      let startTime = (this.appoiment_list[index].shiftStarts).toString().split(" ")[1];
      let endTime = (this.appoiment_list[index].shiftEnds).toString().split(" ")[1];
      this.appoiment_list[index].date =  (this.appoiment_list[index].shiftStarts).toString().split(" ")[0];
      this.appoiment_list[index].shiftStarts = this.timeHelper.convertToAmOrPMTime(startTime);
      this.appoiment_list[index].shiftEnds = this.timeHelper.convertToAmOrPMTime(endTime);
    }
    
    this.appoiment_list.sort(function(a,b){

      return +new Date(b.shiftStarts) - +new Date(a.shiftStarts);
    });
  }

  load_appoiment_services(appoimentID)
  {
    this.active_sppiner();
    this.appoimentResource.getAppoimentServices(appoimentID).toPromise()
    .then((res =>{
        console.log(res);
        this.set_appoiment_services_list(res);
        this.set_current_client_name(appoimentID);
        this.pause_sppiner();
        this.is_services_view_available = true;
    }))
    .catch(err =>{
      console.log(err);
      this.pause_sppiner();
    })
  }

  sorted_list()
  {
    this.appoiment_services_list.sort((a, b) => b.shiftStarts - a.shiftStarts);
    /*
    this.appoiment_services_list.sort(function(a,b){
    });*/
  }

  set_appoiment_services_list(newList)
  {
    this.appoiment_services_list = newList;
  }

  set_current_client_name(appoimentID)
  {
    for (let index = 0; index < this.appoiment_list.length; index++) {
        if(this.appoiment_list[index].appoimentID == appoimentID)
        {
          this.current_client_name = this.appoiment_list[index].clientName;
          return;
        }      
    }
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

  cancel_services_view(){
    this.is_services_view_available = false;
  }

}
