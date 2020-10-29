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
import {Worker } from '../../models/worker';
import 'rxjs/operators';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  staff_form: FormGroup;  
  public loading: boolean   = false;
  public submitted: boolean = false;

  // Esta lista es solo de prueba para pintar varios staff.
  public staff_list: any = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  
  constructor(private formBuilder: FormBuilder,
              private alert_service: AlertService,
              private workerService: WorkerService ) 
  {}
  
  ngOnInit() {
  
    this.staff_form = this.formBuilder.group({
      identification_card:  [""],
      first_name:           [""],
      last_name:            [""],
      gender_id:            [""],
      birthday:             [""],
    });
  
  }
  
  get f() { return this.staff_form.controls; }
  
  // Este me permite crear nuevos staff.
  onSubmit() {
    this.submitted = true;
    // Si el form es valido mandamos a llamar el metodo encargado de crear el staff.
    if (this.staff_form.valid) {
      // Creamos el modelo del staff para almacenarlo en la base de datos.
      var newWorker = new Worker();
        newWorker.identificationCard = this.staff_form.value.identification_card,
        newWorker.firstName =          this.staff_form.value.first_name,
        newWorker.lastName =           this.staff_form.value.last_name,
        newWorker.genderID =           parseInt(this.staff_form.value.gender_id),
      this.create_new_staff(newWorker);
    }
  }

  
  
  // Metodo que permite crear el nuevo staff.
  create_new_staff(staff: Worker){
    console.log(staff);
    this.workerService.createWorker(staff).toPromise()
    .then((res) => {
      this.alert_service.swal_create_messages('center', 'succeess', 'El nuevo personal fue agregado existosamente', 3000);
      this.resetForm();
    })
    .catch(err => {
      console.log(err.error)
        if(err.error["details"]!== null)
        {
          if(err.error["details"]["message"] === 'identification_card must be unique')
          {
            this.alert_service.swal_create_messages('center', 'error', 'El número de la cédula debe ser único, el número selecionado ya existen en la base de datos', 4000);
          }
        }
    })
  }
  
  resetForm() {
    this.submitted  = false;
    this.staff_form.reset();
  }

}
