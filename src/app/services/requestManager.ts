import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorManager } from './errorManager';

@Injectable({
  providedIn: 'root',
})
export class RequestManager {
  private path: string;
  public httpOptions: any;
  constructor(private http: HttpClient, private errManager: HttpErrorManager) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        
      }),
    };
  }


  /**
   * Se usa para configurar el path del servicio.
   * @param service: string
   */
  setPath(service: string) {
    this.path = environment[service];
  }


  /**
   * Maneja una peticion HTTP GET
   * @param endpoint EndPoint del servicio
   * @param params Un Objeto (Clave,Valor)  con los parametros de la sentencia para la peticion
   * @returns Observable<any>
   */
  get(endpoint, params?) {
    const queryParams = new HttpParams();
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        queryParams.append(key, value + '');
      }

    }
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      }),
    };
    this.httpOptions.params = queryParams;
    return this.http.get<any>(`${this.path}${endpoint}`, this.httpOptions).pipe(
      map(
        (res) => {

          if (res && res.hasOwnProperty('Body') && res['Type'] !== 'error') {
            return res['Body'];
          } else {
            return res;
          }
        },
      ),
    );
  }

  /**
   * Maneja una peticion HTTP POST
   * @param endpoint EndPoint del servicio
   * @param element Información a enviar en formato JSON
   * @param httpOptions httpOptionsCustom
   * @returns Observable<any>
   */
  post(endpoint, element, httpOptions?) {
    return this.http.post<any>(`${this.path}${endpoint}`, element, httpOptions || this.httpOptions).pipe(
      catchError(this.errManager.handleError),
      map(
        (res) => {

          if (res && res.hasOwnProperty('Body') && res['Type'] !== 'error') {
            return res['Body'];
          } else {
            return res;
          }
        },
      ),
    );
  }

  /**
   * Maneja una peticion HTTP PUT
   * @param endpoint EndPoint del servicio
   * @param element Información a enviar en formato JSON, con el id para hacer el UPDATE
   * @returns Observable<any>
   */
  put(endpoint, element, id) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      }),
    };
    return this.http.put<any>(`${this.path}${endpoint}/${id}`, element, this.httpOptions).pipe(
      catchError(this.errManager.handleError),
    );
  }

  /**
   * Maneja una peticion HTTP PUT
   * @param endpoint EndPoint del servicio
   * @param element Información a enviar en formato JSON, con los paramentros para hacer el UPDATE
   * @returns Observable<any>
   */
  putParams(endpoint, element) {
    return this.http.put<any>(`${this.path}${endpoint}`, element, this.httpOptions).pipe(
      catchError(this.errManager.handleError),
    );
  }

  /**
   * Maneja una peticion HTTP DELETE
   * @param endpoint EndPoint del servicio
   * @param id id del elemento a eliminar
   * @returns Observable<any>
   */
  delete(endpoint, id) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
      }),
    };
    return this.http.delete<any>(`${this.path}${endpoint}/${id}`, this.httpOptions).pipe(
      catchError(this.errManager.handleError),
    );
  }
}
