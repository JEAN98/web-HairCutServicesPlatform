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
import { HairdresserService } from 'src/app/services/hairdresser.service';
import { HairdresserServiceModel } from 'src/app/models/hairdresser-service-model';

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
   public services_list: HairdresserServiceModel[] = [];
  
  constructor(private formBuilder: FormBuilder,
              private alert_service: AlertService,
              private hairdresserService: HairdresserService
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
    this.load_hairdresser_services_list();
  }
  
  get f() { return this.service_form.controls; }
  
  // Este me permite crear nuevos servicios.
  onSubmit() {
    this.submitted = true;
    // Si el form es valido mandamos a llamar el metodo encargado de crear el servicio.
    if (this.service_form.valid) {
      
      var newService = new HairdresserServiceModel();
    
        newService.title =               this.service_form.value.title;
        newService.code =                this.service_form.value.code;
        newService.description =         this.service_form.value.description;
        newService.cost=                this.service_form.value.cost;
        newService.timeDuration =   this.service_form.value.duration_min;
        newService.genderID =           1; //FIXME: In the future this one needs to be updated
        newService.isMeasurable=       true;
     

      this.create_new_service(newService);
      
    }
  }
  
  // Metodo que permite crear el nuevo servicio.
  create_new_service(newService: HairdresserServiceModel){

     this.hairdresserService.createHairdresserService(newService).toPromise()
     .then((resp) => {
       this.alert_service.swal_create_messages('center', 'success', 'Se ha registrado un servicio con éxito.', 3000);
       this.resetForm();
       this.load_hairdresser_services_list();
     })
     .catch(err => {
       this.alert_service.swal_create_messages('center', 'error', 'message', 3000);
    });
  }
  
  // Este me permite reestablecer los campos del form y la varible submitted.
  resetForm() {
    this.submitted  = false;
    this.service_form.reset();
  }

  load_hairdresser_services_list()
  {
    this.hairdresserService.getHairdresserServiceList().toPromise()
    .then((res) => {
        this.set_hairdresser_services_list(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  set_hairdresser_services_list(res: any) {
    this.services_list = res;
    console.log(this.services_list);
  }


}
