import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {HeaderService} from './header.service';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  public url: string;
  private path:string;

  constructor(private http: HttpClient,
    private headerService: HeaderService) { 
      this.path = 'gender';
      this.url = this.headerService.urlBase + this.path;
    }

  refreshUrl() {
    this.url =  this.headerService.urlBase + this.path;
  }

  getGenderList() {
    console.log(this.url);
    this.refreshUrl();
    return this.http.get(this.url, this.headerService.getHeaderToken());
  }
}
