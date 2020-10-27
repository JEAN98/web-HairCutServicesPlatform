import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {HeaderService} from './header.service';

@Injectable({
  providedIn: 'root'
})
export class HairdressingSalonService {
  public url: string;
  constructor(private http: HttpClient,
    private headerService: HeaderService) {
    this.url = this.headerService.urlBase + 'hairdressingSalon';
  }

  refreshUrl() {
    this.url =  this.headerService.urlBase + 'hairdressingSalon';
  }

  createHS(hSalon: any) {
    this.refreshUrl();
    return this.http.post(this.url, hSalon);
  }

}
