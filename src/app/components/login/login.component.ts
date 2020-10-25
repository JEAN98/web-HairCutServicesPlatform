import { Component, OnInit }     from '@angular/core';
import { NgForm }                from '@angular/forms';
import { Router }                from '@angular/router';
import { AlertService }          from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading: boolean;
  public email_user;
  public password_user;

  constructor(
    private router: Router,
    private alert_service: AlertService,
  ) 
  { 

  }

  ngOnInit(): void {
  }

  log_in(userForm: NgForm) {

    console.log(userForm);

    // Variables que contienen la data del formulario
    this.email_user    = userForm.value.email_login;
    this.password_user = userForm.value.password_login;

    if (!this.email_user || !this.password_user) {
      this.alert_service.swal_login_message('Oops...', 'Debes de completar el formulario.', 'error', 3000);
    } else {
      this.validate_data(this.email_user, this.password_user);
    }

  }

  validate_data(email: string, password: string){
    const email_data    = 'steve@gmail.com'; //esto es para probar unicamente, se debe de eliminar.
    const password_data = 'admin12345'; //esto es para probar unicamente, se debe de eliminar.

    //Metodo de peticion al servicio que hay que crear, no se si deseas trabajarlo diferente.
    // this.login_service.login(email, password).toPromise()
    //   .then((resp) => {
    //     console.log(resp);
    //   })
    //   .catch(err => {
    //     // Saber cuando viene datos invalidos.
    //     this.alert_service.swal_login_message('Oops...', err.error.msg, 'error', 3000);
    // });

    // Esto es solo simulando la validación. Eliminar esto luego.
    if (email === email_data && password === password_data) {
      this.alert_service.swal_create_messages('center', 'success', 'Login realizado con éxito', 3000);
      this.router.navigate(['/dashboard']);
    } else {
      this.alert_service.swal_create_messages('center', 'error', 'Credeciales invalidas, ingresa un usuario valido.', 3000);
    }
    
  }

}
