import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HairdresserServiceModel } from '../models/hairdresser-service-model';
import { HeaderService } from './header.service';
@Injectable({
  providedIn: 'root'
})
export class HairdresserService {

  public url: string;
  constructor(private http: HttpClient,
    private headerService: HeaderService) {
    this.url = this.headerService.urlBase + 'hairdresserService';
  }

  refreshUrl() {
    this.url =  this.headerService.urlBase + 'hairdresserService';
  }

  createHairdresserService(hairdresserServiceModel:HairdresserServiceModel ) {
    this.refreshUrl();
    return this.http.post(this.url, hairdresserServiceModel,this.headerService.getHeaderToken());
  }

  getHairdresserServiceList()
  {
    this.refreshUrl();
    return this.http.get(this.url,this.headerService.getHeaderToken());
  }
}
