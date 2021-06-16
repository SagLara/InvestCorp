import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorManager {
  constructor(
   ) {}

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);

    }
    Swal.fire({
      icon: 'error',
      title: 'Error. Algo salio mal',
      text: 'No se puede conectar con el servicio intente más tarde.',
      showConfirmButton: false,
      timer: 2500
    });
    // return an observable with a user-facing error message
    return throwError({
      status: error.status,
      message: 'Something bad happened; please try again later.',
    });
  }
}
