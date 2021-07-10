import { Injectable } from '@angular/core';
import { RequestManager } from './requestManager';

@Injectable({
  providedIn: 'root'
})
export class GananciasService {

  constructor(private requestManager: RequestManager) {
    this.requestManager.setPath('GANANCIAS_SERVICE');
  }

  get(endpoint) {
    this.requestManager.setPath('GANANCIAS_SERVICE');
    return this.requestManager.get(endpoint);
  }

  post(endpoint, element) {
    this.requestManager.setPath('GANANCIAS_SERVICE');
    return this.requestManager.post(endpoint, element);
  }

  put(endpoint, element, id) {
    this.requestManager.setPath('GANANCIAS_SERVICE');
    return this.requestManager.put(endpoint, element, id);
  }

  delete(endpoint, element) {
    this.requestManager.setPath('GANANCIAS_SERVICE');
    return this.requestManager.delete(endpoint, element.Id);
  }

}
