import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  // constructor() { }

  putSave(token: string) {
    localStorage.setItem('token', token);
  }

  getAll() {
    const token = localStorage.getItem('token');
    return token;
  }

  delLocal(){
    localStorage.removeItem('token');
  }

}
