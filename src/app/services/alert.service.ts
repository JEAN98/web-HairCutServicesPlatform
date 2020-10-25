import { Injectable } from '@angular/core';
import Swal           from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  swal_login_message(title, message, icon, time){
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        timer: time,
        timerProgressBar: true,
        showCancelButton: false ,
        showConfirmButton: false
      });
  }

  swal_create_messages(position, icon, title, timer){
    Swal.fire({
      position: position,
      icon: icon,
      title: title,
      showConfirmButton: true,
      timerProgressBar: true,
      timer: timer
    })
  }
}
