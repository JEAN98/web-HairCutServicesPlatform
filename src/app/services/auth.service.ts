import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sessionURL: string; // base url
  
  constructor(private http: HttpClient, private headerService: HeaderService) {
    this.sessionURL = this.headerService.urlBase + 'hairdressingSalon/session';
  }
  /* refreshUrl() {
    this.loginUrl = this.headerService.getGuestURL() + '/guest/users/session';
  } */

  login(email: string, password: string) {
    //this.refreshUrl();
    console.log(this.headerService.getHeaderLogin());
    return this.http.post(this.sessionURL, {email:email,password:password}, this.headerService.getHeaderLogin());
  }

  logout() {
    return this.http.delete(this.sessionURL, this.headerService.getHeaderToken());
  }

  loggedIn(){
    return !!localStorage.getItem('session')
  }

}
