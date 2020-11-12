import { Injectable } from '@angular/core';
import {Session} from '../models/session';
import {HairdressingSalon} from '../models/hairdressing-salon';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() 
  { 
    this.getSession();
  }

  getSession() : any{
    console.log( localStorage.getItem('session') != 'undefined','session');
    if(localStorage.getItem('session') !== null &&localStorage.getItem('session') !== undefined && localStorage.getItem('session') !== 'undefined')
    {
      console.log(localStorage.getItem('session'));
      return JSON.parse(localStorage.getItem('session'));
    }
    return null;
  }

  
  saveSession(session: Session) {
    localStorage.setItem( 'session', JSON.stringify(session));
  }

  saveCurrentHS(hairdressingSalon:HairdressingSalon)
  {
   // hairdressingSalon.photo = '';
    localStorage.setItem('currentHS',JSON.stringify(hairdressingSalon));
  }

  getCurrentHS()
  {
    let currentHS = localStorage.getItem('currentHS'); 
    if(currentHS != null && currentHS != "undefined")
    {
      return JSON.parse(localStorage.getItem('currentHS')) as HairdressingSalon;
    }
    return undefined;
  }

  public deleteData()
  {
    localStorage.clear();
  }

}
