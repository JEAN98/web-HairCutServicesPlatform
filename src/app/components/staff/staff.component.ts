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
  ) 
  { 

  }
  
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
      const staff: any = {
        salon_id:            1, //Este se debe de optener del objeto que esta en localstorage.
        identification_card: this.staff_form.value.identification_card,
        first_name:          this.staff_form.value.first_name,
        last_name:           this.staff_form.value.last_name,
        gender_id:           this.staff_form.value.gender_id,
        birthday:            this.staff_form.value.birthday,
      }

      this.create_new_staff(staff);
      
    }
  }
  
  // Metodo que permite crear el nuevo staff.
  create_new_staff(staff: any){

    console.log(staff);

    // this._staff_service.create_new_staff(staff).toPromise()
    // .then((resp) => {
    //   this.alert_service.swal_create_messages('center', 'success', 'Se ha registrado un staff con éxito.', 3000);
    //   this.resetForm();
    // })
    // .catch(err => {
    //   this.alert_service.swal_create_messages('center', 'error', 'message', 3000);
    // });
  }
  
  // Este me permite reestablecer los campos del form y la varible submitted.
  resetForm() {
    this.submitted  = false;
    this.staff_form.reset();
  }

}
