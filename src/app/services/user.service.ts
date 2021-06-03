import { Injectable } from '@angular/core';
import { RequestManager } from './requestManager';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private requestManager: RequestManager) {
    this.requestManager.setPath('USER_SERVICE');
  }

  get(endpoint) {
    this.requestManager.setPath('USER_SERVICE');
    return this.requestManager.get(endpoint);
  }

  post(endpoint, element) {
    this.requestManager.setPath('USER_SERVICE');
    return this.requestManager.post(endpoint, element);
  }

  put(endpoint, element, id) {
    this.requestManager.setPath('USER_SERVICE');
    return this.requestManager.put(endpoint, element, id);
  }

  delete(endpoint, element) {
    this.requestManager.setPath('USER_SERVICE');
    return this.requestManager.delete(endpoint, element.Id);
  }
}
