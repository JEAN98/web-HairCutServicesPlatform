import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  public url: string;
  constructor(private http: HttpClient,
    private headerService: HeaderService) {
    this.url = this.headerService.urlBase + 'report';
  }

  refreshUrl() {
    this.url =  this.headerService.urlBase + 'report';
  }

 
  getReportList()
  {
    this.refreshUrl();  
    return this.http.get(this.url,this.headerService.getHeaderToken());
  }
}
