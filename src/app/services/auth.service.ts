import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sessionURL: string; // base url
  
  constructor(private http: HttpClient, private headerService: HeaderService) {
    this.sessionURL = this.headerService.urlBase + '/hairdressingSalon/session';
  }
  /* refreshUrl() {
    this.loginUrl = this.headerService.getGuestURL() + '/guest/users/session';
  } */

  login(email: string, password: string) {
    //this.refreshUrl();
    const body = new HttpParams()
    .set('email', email)
    .set('password', password)
    return this.http.post(this.sessionURL, body, this.headerService.getHeaderLogin());
  }

  logout() {
    return this.http.delete(this.sessionURL, this.headerService.getHeaderToken());
  }

}
