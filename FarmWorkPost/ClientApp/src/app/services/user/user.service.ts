import { Injectable } from '@angular/core';
import { ConfigService } from '../common/config.service';
import { HttpClient } from '@angular/common/http';
import { AppUser } from 'src/app/models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string ="https://localhost:5001/api";

  constructor(private configService: ConfigService, private http: HttpClient) { }

  /**
   * Register New User
   */
  registerSocialUser(user: AppUser): Observable<any>{
    console.log(user);
   return this.http.post(this.baseUrl + '/User/UserLogin', user);
  }

  /**
   * Register New User
   */
  registerNewUser(user:AppUser) {
    this.http.post(this.baseUrl+'/user/CreateNewUser', user);
  }
}
