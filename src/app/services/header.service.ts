import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Session } from '../models/session';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public urlBase: string;
  public token: string;
  constructor(private sessionService: SessionService) {
    this.urlBase  = '/api/';
  }

  loadSession():Session{
    return this.sessionService.getCurrentSession();
  }


  getHeader() {
    const header = new HttpHeaders({
      // tslint:disable-next-line:object-literal-key-quotes
      'Accept': 'text/html, application/xhtml+xml, */*',
      'Content-Type': 'application/json',
    });
    return {headers: header};
  }

  getHeaderLogin() {
    // tslint:disable-next-line:new-parens
    const header = new HttpHeaders;
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return {headers: header};
  }


  getHeaderToken() {
    /*  const header = new HttpHeaders({
        'Content-Type': 'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': 'Bearer ' + this.session.access_token
      }); */
      console.log(this.loadSession().access_token, 'acces_token');
      const header = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.loadSession().access_token
      });
  
      return {headers: header};
    }
}
