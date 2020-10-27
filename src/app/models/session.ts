import { HairdressingSalon } from './hairdressing-salon';
import { JwtHelperService } from '@auth0/angular-jwt';


export class Session {
  /*  hairdressingSalon : HairdressingSalon;
    token: string;*/
     access_token: string;
     token_type: string;
     expires_in: number;
     jwtService: JwtHelperService;

     constructor(sessionJson) {
         this.access_token = sessionJson['access_token'];
         this.token_type  = sessionJson['token_type'];
         this.expires_in = sessionJson['expires_in'];
         this.jwtService = new JwtHelperService();
     }
 
     public getDecodedToken(): any {
        return this.jwtService.decodeToken(this.access_token);
     }
 
     public isTokenExpired(): boolean {
       return this.jwtService.isTokenExpired(this.access_token);
     }
 
}
