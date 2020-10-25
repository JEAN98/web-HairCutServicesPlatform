import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public urlBase: string;
  public token: string;
  constructor() {
    this.urlBase  = '/api/';
  }

  getHeader() {
    const header = new HttpHeaders({
      // tslint:disable-next-line:object-literal-key-quotes
      'Accept': 'text/html, application/xhtml+xml, */*',
      'Content-Type': 'application/json',
    });
    return {headers: header};
  }

  getHeaderToken() {
    //TODO: Update it in oder to handle the token from localStorage
    //this.token = localStorage.getItem('token');
    this.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJIYWlyQ3V0U2VydmljZXNQbGF0Zm9ybSIsInN1YiI6MSwiZW1haWwiOiJzYWxvblRlc3RAZ21haWwuY29tIiwibmFtZSI6IlNhbG9uIFRlc3QiLCJhY2NvdW50VHlwZSI6IkhhaXJkcmVzc2luZ1NhbG9uIiwiaWF0IjoxNjAzNjU5Mjk4LCJleHAiOjE2MDM3NDU2OTh9.qubhGnrsQElgNRzSgYMZuMAJCzb6FANVaBPd_z6K7Xj2EP5e72rZ1EAFb0-5z7PnIsx3jXC_WMRQocUYOnH7Hg';
    const header = new HttpHeaders({

      // tslint:disable-next-line:object-literal-key-quotes
      'Accept': 'text/html, application/xhtml+xml, */*',
      'Content-Type': 'application/json',
      // tslint:disable-next-line:object-literal-key-quotes
      'Authorization': this.token

    });

    return {headers: header};

  }
}
