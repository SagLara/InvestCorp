import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = environment.baseUrl;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private userService : UserService) {
  }

  get(endpoint) {
    return this.http.get(`${this.url}/${endpoint}`);
  }

  post(endpoint, element) {
    return this.http.post(`${this.url}/${endpoint}`,element);
  }

  put(endpoint, element) {
    return this.http.put(`${this.url}/${endpoint}`,element);
  }

  delete(endpoint, id:number) {
    return this.http.delete(`${this.url}/${endpoint}/${id}`);
  }

  isAuth():boolean{
    const token = localStorage.getItem('token');
    if(token==null ){
      return false;
    }else if(this.jwtHelper.isTokenExpired(token)){
      return false;
    }
    return true;
  }

  getUser(): Promise<any>{
    return new Promise((resolve) =>{
      const email = localStorage.getItem('email');
      /** Aca puede ser Get O Post, dependiendo de como sea más facil para el back
       * const userName = localStorage.getItem('userName');
       * this.userService.get('/api/getUser/'+userName)
       */
      this.userService.post('/api/getUser',email)
        .subscribe((res: any) => {
          console.log(res);
          if(res!= undefined && res!=null){
            const user:User = res;
            resolve(user)
          }else{
            resolve(null);
          }
        },((error:any) =>{
          console.log(error);
          resolve(null);
        }));
      });
  }
}
