import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schedule } from '../models/schedule';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  public url: string;
  constructor(private http: HttpClient,
    private headerService: HeaderService) {
    this.url = this.headerService.urlBase + 'schedule';
  }

  refreshUrl() {
    this.url =  this.headerService.urlBase + 'schedule';
  }

  createSchedules(scheduleList: Schedule[]) {
    this.refreshUrl();
    return this.http.post(this.url, scheduleList,this.headerService.getHeaderToken());
  }

  getScheduleList()
  {
    this.refreshUrl();
    return this.http.get(this.url,this.headerService.getHeaderToken());
  }
}
