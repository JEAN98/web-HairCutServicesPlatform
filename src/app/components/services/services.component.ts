import { Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter  }       from '@angular/core';

// Formulario
import { FormGroup,
  FormBuilder,
  Validators }          from '@angular/forms';

// Servicios
import { AlertService } from '../../services/alert.service';

import 'rxjs/operators';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  service_form: FormGroup;  
  public loading: boolean   = false;
  public submitted: boolean = false;

   // Esta lista es solo de prueba para pintar varios servicios.
   public services_list: any = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  
  constructor(private formBuilder: FormBuilder,
              private alert_service: AlertService,
  ) 
  { 

  }
  
  ngOnInit() {
  
    this.service_form = this.formBuilder.group({
      title:          [""],
      code:           [""],
      description:    [""],
      cost:           [""],
      duration_min:   [""],
      gender_id:      [""],
    });
  
  }
  
  get f() { return this.service_form.controls; }
  
  // Este me permite crear nuevos servicios.
  onSubmit() {
    this.submitted = true;
    // Si el form es valido mandamos a llamar el metodo encargado de crear el servicio.
    if (this.service_form.valid) {
      // Creamos el modelo del servicio para almacenarlo en la base de datos.
      const service: any = {
        salon_id:            1, //Este se debe de optener del objeto que esta en localstorage.
        title:               this.service_form.value.title,
        code:                this.service_form.value.code,
        description:         this.service_form.value.description,
        cost:                this.service_form.value.cost,
        time_duration_min:   this.service_form.value.duration_min,
        gender_id:           this.service_form.value.gender_id,
        is_measurable:       true,
      }

      this.create_new_service(service);
      
    }
  }
  
  // Metodo que permite crear el nuevo servicio.
  create_new_service(servicio: any){

    console.log(servicio);

    // this._servicio_service.create_new_servicio(servicio).toPromise()
    // .then((resp) => {
    //   this.alert_service.swal_create_messages('center', 'success', 'Se ha registrado un servicio con éxito.', 3000);
    //   this.resetForm();
    // })
    // .catch(err => {
    //   this.alert_service.swal_create_messages('center', 'error', 'message', 3000);
    // });
  }
  
  // Este me permite reestablecer los campos del form y la varible submitted.
  resetForm() {
    this.submitted  = false;
    this.service_form.reset();
  }

}
