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
import { HairdressingSalonService } from 'src/app/services/hairdressing-salon.service';
import { HairdressingSalon } from 'src/app/models/hairdressing-salon';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

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
  public imageBase64AsString: string;
  public hairdressingSalon:HairdressingSalon = new HairdressingSalon();

  constructor(
              private formBuilder: FormBuilder,
              private alert_service: AlertService,
              private router: Router,
              private genderService: GenderService,
              private hsService: HairdressingSalonService,
              private localStorageService: LocalStorageService
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
      website:          [[''],[Validators.required, Validators.minLength(8), Validators.maxLength(500)]],
      gender:           [''],
      password:         [[''], [Validators.required, Validators.minLength(8), Validators.maxLength(200)]],
    });
    //this.getGenderList();
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
      
      this.hairdressingSalon.name = this.register_form.value.name;
      this.hairdressingSalon.description = this.register_form.value.description;
      this.hairdressingSalon.email = this.register_form.value.email;
      this.hairdressingSalon.latitud = this.register_form.value.latitud;
      this.hairdressingSalon.longitud =     this.register_form.value.longitud;
      this.hairdressingSalon.lunchStarts = this.register_form.value.start_time + ':00';
      this.hairdressingSalon.lunchEnds =   this.register_form.value.end_time + ':00';
      this.hairdressingSalon.website =      this.register_form.value.website;
      this.hairdressingSalon.genderID =      1; //FIXME: Men as default
      this.hairdressingSalon.password =     this.register_form.value.password;
      this.hairdressingSalon.photo = this.imageBase64AsString;
      this.createHS();
     
    }
  }

  async getGenderList() {
    let result = await this.genderService.getGenderList().toPromise()
   console.log(result);
  }

  async createHS() {
    let newAccount = await this.hsService.createHS(this.hairdressingSalon).toPromise()
    console.log(newAccount);
    this.localStorageService.saveSession(newAccount['session']);
    this.localStorageService.saveCurrentHS(newAccount['hairdressingSalon']);
    this.router.navigate(['/dashboard']);
    //this.alert_service.swal_create_messages('center', 'success', 'Barberia creada con éxito', 3000);
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
      me.imageBase64AsString = reader.result as string;
      console.log( me.imageBase64AsString.length);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

}
