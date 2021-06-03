import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = environment.baseUrl;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
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
}
