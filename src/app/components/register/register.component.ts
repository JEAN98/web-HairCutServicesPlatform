import { Component,
          OnInit,
          OnDestroy,
          Input,
          Output,
          EventEmitter  } from '@angular/core';

// Formulario
import { FormGroup,
          FormBuilder,
          Validators }    from '@angular/forms';

import { AlertService } from '../../services/alert.service';
import { from } from 'rxjs';
import { GenderService } from 'src/app/services/gender.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register_form: FormGroup;
  public submitted: boolean = false;
  public loading: boolean   = false;
  public uploadFile: File;
  public image_name: string = 'Seleccione una imagen...';
  public imageBase64: any;

  constructor(
              private formBuilder: FormBuilder,
              private alert_service: AlertService,
              private genderService: GenderService
  ) 
  { 

  }

  ngOnInit() {
    this.register_form = this.formBuilder.group({
      name:             [[''], [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description:      [[''], [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      email:            [[''], [Validators.required, Validators.minLength(12), Validators.maxLength(100)]],
      latitud:          [[''], [Validators.required, Validators.minLength(4)]],
      longitud:         [[''], [Validators.required, Validators.minLength(4)]],
      start_time:       [''],
      end_time:         [''],
      // photo:            [''],
      website:          [''],
      gender:           [''],
      password:         [[''], [Validators.required, Validators.minLength(8), Validators.maxLength(200)]],
    });
    this.getGenderList();
  }

  get f() { return this.register_form.controls; }

  ngOnDestroy(){
  }

  // Este me permite crear nuevas barbershops.
  onSubmit() {
    this.submitted = true;

    console.log(this.register_form.valid);
    console.log(this.register_form.value);

    // Si el form es valido mandamos a llamar el metodo encargado de crear la nueva barbershop.
    if (this.register_form.valid) {

      const barberShop: any = {
        name:         this.register_form.value.name,
        description:  this.register_form.value.description,
        email:        this.register_form.value.email,
        latitud:      this.register_form.value.latitud,
        longitud:     this.register_form.value.longitud,
        lunch_starts: this.register_form.value.start_time,
        lunch_ends:   this.register_form.value.end_time,
        photo:        this.uploadFile,
        website:      this.register_form.value.website,
        gender:       this.register_form.value.gender,
        password:     this.register_form.value.password,
      }

      this.alert_service.swal_create_messages('center', 'success', 'Barberia creada con éxito', 3000);
      console.log(barberShop);

    }
  }

  async getGenderList() {
    let result = await this.genderService.getGenderList().toPromise()
   console.log(result);
  }

   upload_image( file: File ) {

    this.uploadFile = file;
    if ( !file ) { 
      this.image_name = 'Seleccione una imagen...';
      return this.uploadFile = null;
    }
    this.image_name = file.name;
    this.convertBase64(file);
    return this.uploadFile;
  
  }

   convertBase64(file){
    let me = this;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.imageBase64 = reader.result;
    };
    console.log(this.imageBase64)
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

}
