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

}
