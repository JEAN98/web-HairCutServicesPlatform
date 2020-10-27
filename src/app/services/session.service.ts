import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public session: any;


  constructor(private http: HttpClient, private localStorageSrv: LocalStorageService) {
    this.session = this.localStorageSrv.getSession();
    this.printTokenData();
  }

  private printTokenData() {
    /* console.log('isTokenExpired = ', this.session.isTokenExpired());
    console.log(this.session);
    console.log('Payload = ', this.session.getDecodedToken()); */
  }

  public getCurrentSession():any
  {
    return this.localStorageSrv.getSession();
  }

 /*  logout() {
    
    this.authService.logout().toPromise()
    .then((res) => {
      this.deleteData();
      this.router.navigate( ['/mainView']);
    })
    .catch(err => {
      console.log(err);
    });

  } */


}
