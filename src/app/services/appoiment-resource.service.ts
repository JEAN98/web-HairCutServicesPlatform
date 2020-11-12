import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class AppoimentResourceService {

  public url: string;
  constructor(private http: HttpClient,
    private headerService: HeaderService) {
    this.url = this.headerService.urlBase + 'appoimentService?appoimentID=';
  }

  refreshUrl() {
    this.url =  this.headerService.urlBase + 'appoimentService?appoimentID=';
  }

  
  getAppoimentServices(appoimentID:number)
  {
    this.refreshUrl();
    return this.http.get(this.url + appoimentID,this.headerService.getHeaderToken());
  }
}
