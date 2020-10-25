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
import { AlertService } from 'src/app/services/alert.service';

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
  // Lista de los horarios que se van a crear.
  schedule_list: any        = [];


  
  // Esta lista es solo de prueba para pintar varios horarios.
  public schedule_list_pinter: any = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

  constructor(
    private formBuilder: FormBuilder,
    private alert_service: AlertService
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
          this.days_list.push(1);
        }
        if (tuesday) {
          this.days_list.push(2);
        }
        if (wednesday) {
          this.days_list.push(3);
        }
        if (thursday) {
          this.days_list.push(4);
        }
        if (friday) {
          this.days_list.push(5);
        }
        if (saturday) {
          this.days_list.push(6);
        }
        if (sunday) {
          this.days_list.push(7);
        }
        for (let index = 0; index < this.days_list.length; index++) {
          const element = this.days_list[index];
          // Creamos el modelo del horario para almacenarlo en la base de datos.
          const schedule: any = {
            weekday_id:      element,
            start_time:      this.schedule_form.value.start_time,
            end_time:        this.schedule_form.value.end_time,
          };
          this.schedule_list.push(schedule);
        };
        this.create_new_schedule(this.schedule_list);
      }
    }
  }

  // Metodo que permite crear un nuevo horario.
  create_new_schedule(schedule_list: any){


    console.log(schedule_list);


    this.alert_service.swal_create_messages('center', 'success', 'Se ha registrado un nuevo horario.', 3000);
    this.resetForm();

  }

  // Este me permite restablecer los campos del form y la varible submitted.
  resetForm() {
    this.submitted  = false;
    this.schedule_form.reset();
  }

}
