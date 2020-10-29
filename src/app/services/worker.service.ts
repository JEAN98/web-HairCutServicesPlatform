import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderService } from './header.service';
import {Worker} from '../models/worker';
@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  public url: string;
  constructor(private http: HttpClient,
    private headerService: HeaderService) {
    this.url = this.headerService.urlBase + 'worker';
  }

  refreshUrl() {
    this.url =  this.headerService.urlBase + 'worker';
  }

  createWorker(worker: Worker) {
    this.refreshUrl();
    return this.http.post(this.url, worker,this.headerService.getHeaderToken());
  }

  getWorkerList()
  {
    this.refreshUrl();
    return this.http.get(this.url,this.headerService.getHeaderToken());
  }
}
