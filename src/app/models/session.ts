import { HairdressingSalon } from './hairdressing-salon';
import { JwtHelperService } from '@auth0/angular-jwt';


export class Session {
  /*  hairdressingSalon : HairdressingSalon;
    token: string;*/
     access_token: string;
     jwtService: JwtHelperService;

     constructor(sessionJson) {
         this.access_token = sessionJson;
         this.jwtService = new JwtHelperService();
     }
 
     public getDecodedToken(): any {
        return this.jwtService.decodeToken(this.access_token);
     }
 
     public isTokenExpired(): boolean {
       return this.jwtService.isTokenExpired(this.access_token);
     }
 
}
