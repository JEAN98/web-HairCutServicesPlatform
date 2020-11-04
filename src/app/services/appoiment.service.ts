import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class AppoimentService {

  public url: string;
  constructor(private http: HttpClient,
    private headerService: HeaderService) {
    this.url = this.headerService.urlBase + 'appoiment/hairdressingSalon?';
  }

  refreshUrl() {
    this.url =  this.headerService.urlBase + 'appoiment/hairdressingSalon?';
  }

  
  getAppoimentList(dateFrom:String, dateTo:String)
  {
    dateFrom = dateFrom + ' 00:00:00';
    dateTo = dateTo + ' 23:59:00';
    this.refreshUrl();
    let currentURL = this.url + 'dateFrom=' + dateFrom + '&dateTo=' + dateTo;
    console.log(currentURL);
    return this.http.get(currentURL,this.headerService.getHeaderToken());
  }
}
