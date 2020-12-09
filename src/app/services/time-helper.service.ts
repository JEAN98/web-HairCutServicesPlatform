import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TimeHelperService {

  constructor() { }


  validateTime(timeA, timeB):boolean
  { 
    
    let newDateA = new Date('1968-11-16T'+timeA );
    let newDateB = new Date('1968-11-16T'+timeB );
    console.log(newDateA,newDateB);
    return newDateA < newDateB;
  }

  convertToAmOrPMTime(time)
  {
    let d = new Date('1968-11-16T'+time );
    var ampm = (d.getHours() >= 12) ? "PM" : "AM";
    var hours = ((d.getHours() > 12) ? d.getHours()-12 : d.getHours()).toString();
    var minutes = d.getMinutes().toString();
    if( minutes.length == 1)
       minutes = '0'+ d.getMinutes().toString();

    if( hours.length == 1)
       hours  = '0'+hours;

    return hours+' : '+minutes+' '+ampm;
  }

}
