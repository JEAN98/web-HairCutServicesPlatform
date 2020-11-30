import { Component, OnInit }     from '@angular/core';
import { NgForm }                from '@angular/forms';
import { Router }                from '@angular/router';
import { Session }               from '../../models/session';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
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
  public session: Session;
  public sppinerClass:String = '';

  constructor(
    private router: Router,
    private alert_service: AlertService,
    private storageService: LocalStorageService,
    private authService: AuthService
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
      this.alert_service.swal_login_message('Oops...', 'Debe de completar el formulario.', 'error', 3000);
    } else {
      this.validate_data(this.email_user, this.password_user);
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

  validate_data(email: string, password: string){
    this.active_sppiner();
  this.authService.login(email,password).toPromise()
    .then((res) =>{
      this.session = new Session(res["token"]);
      this.storageService.saveSession(this.session);
      this.storageService.saveCurrentHS(res["hairdressingSalon"]);
      this.router.navigate(['/dashboard']);
      this.pause_sppiner();
    })
    .catch(err => {
      this.alert_service.swal_create_messages('center', 'error', 'Credeciales invalidas', 3000);
      this.pause_sppiner();
    })
  }
}
