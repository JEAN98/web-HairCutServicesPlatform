import { 
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter  }       from '@angular/core';

// Formulario
import { 
  FormGroup,
  FormBuilder,
  Validators }          from '@angular/forms';
import { Schedule } from 'src/app/models/schedule';
import { AlertService } from 'src/app/services/alert.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { TimeHelperService } from 'src/app/services/time-helper.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  // Esta variable me permite crear un formulario de tipo form para extraer sus datos.
  schedule_form: FormGroup;
  // Esta variable me permite saber si esta realizando alguna accion.
  public loading: boolean   = false;
  // Esta variable me permite identificar si ya el usuario hizo o no clic en el boton enviar.
  public submitted: boolean = false;
  public days_list: any     = [];

  public schedule_list: any        = [];

  constructor(
    private formBuilder: FormBuilder,
    private alert_service: AlertService,
    private schedule_service: ScheduleService,
    private time_helper: TimeHelperService
  ) { }

  ngOnInit(): void {
    this.schedule_form = this.formBuilder.group({
      monday:           [''],
      tuesday:          [''],
      wednesday:        [''],
      thursday:         [''],
      friday:           [''],
      saturday:         [''],
      sunday:           [''],
      start_time:       [''],
      end_time:         [''],
    });
    this.load_schedules();
  }

  get f() { return this.schedule_form.controls; }

  // Este me permite des inscribirme del ui.
  ngOnDestroy(){

  }

  // Este me permite crear nuevos horarios.
  onSubmit() {

    this.submitted = true;

    const monday    = this.schedule_form.value.monday;
    const tuesday   = this.schedule_form.value.tuesday;
    const wednesday = this.schedule_form.value.wednesday;
    const thursday  = this.schedule_form.value.thursday;
    const friday    = this.schedule_form.value.friday;
    const saturday  = this.schedule_form.value.saturday;
    const sunday    = this.schedule_form.value.sunday;

    if (monday    != true &&
        tuesday   != true &&
        wednesday != true &&
        thursday  != true &&
        friday    != true &&
        saturday  != true &&
        sunday    != true ) {

      this.alert_service.swal_create_messages('center', 'error', 'Debes de seleccionar mínimo un día.', 3000);

    } else {
      // Si el form es valido mandamos a llamar el metodo encargado de crear el horario.
      if (this.schedule_form.valid) {
        if (monday) {
          this.days_list.push(2);
        }
        if (tuesday) {
          this.days_list.push(3);
        }
        if (wednesday) {
          this.days_list.push(4);
        }
        if (thursday) {
          this.days_list.push(5);
        }
        if (friday) {
          this.days_list.push(6);
        }
        if (saturday) {
          this.days_list.push(7);
        }
        if (sunday) {
          this.days_list.push(1);
        }

        let newScheduleList = []
        for (let index = 0; index < this.days_list.length; index++) {
          const element = this.days_list[index];
         
          var newSchedule = new Schedule();
          newSchedule.shiftStarts = this.schedule_form.value.start_time + ':00';
          newSchedule.shiftEnds =  this.schedule_form.value.end_time + ':00';
          newSchedule.weekDayID = element;

          newScheduleList.push(newSchedule);
        };
        this.create_new_schedule(newScheduleList);
      }
    }
  }

  
  // Metodo que permite crear un nuevo horario.
  create_new_schedule(schedule_list: Schedule[]){
    console.log(schedule_list);
    this.schedule_service.createSchedules(schedule_list).toPromise()
    .then((resp)=>{
      this.alert_service.swal_create_messages('center', 'success', 'Se ha registrado un nuevo horario.', 3000);
      this.resetForm();
      this.load_schedules();
    })
    .catch(err => {
      console.log(err);
    })


  }

  // Este me permite restablecer los campos del form y la varible submitted.
  resetForm() {
    this.submitted  = false;
    this.schedule_form.reset();
  }

  load_schedules()
  {
    this.schedule_service.getScheduleList().toPromise()
    .then((resp)=>{
      this.set_schedules_list(resp);
    })
    .catch( err =>{
      console.log(err);
    })
  }

  set_schedules_list(res: any) {
    this.schedule_list = res;
    this.schedule_list.sort(function(a, b){
      return a.weekDayID > b.weekDayID;
    });
  }

}
