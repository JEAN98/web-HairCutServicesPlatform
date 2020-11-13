import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Session } from '../models/session';
import { SessionService } from './session.service';
import {environment} from'../../environments/environment.prod';
  import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public urlBase: string;
  public token: string;
  constructor(private sessionService: SessionService) {
    this.urlBase  = environment.apiUrl+'/api/';
  }

  loadSession():Session{
    return this.sessionService.getCurrentSession();
  }


  getHeader() {
    const header = new HttpHeaders({
      // tslint:disable-next-line:object-literal-key-quotes
      'Accept': 'text/html, application/xhtml+xml, */*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return {headers: header};
  }

  getHeaderLogin() {
    /*
    const header = new HttpHeaders;
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    header.append('Access-Control-Allow-Origin', '*');
    return {headers: header};*/
    const header = new HttpHeaders({
      // tslint:disable-next-line:object-literal-key-quotes
      'Accept': 'text/html, application/xhtml+xml, */*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
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
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + this.loadSession().access_token
      });
  
      return {headers: header};
    }
}
