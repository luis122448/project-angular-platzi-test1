import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SaveUserDTO, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.API_URL + '/api/users';

  constructor(
    private httpCliente: HttpClient,
  ) { }

  getAll(){
    return this.httpCliente.get<User[]>(this.apiUrl);
  }

  postSave(user: SaveUserDTO){
    return this.httpCliente.post<User>(this.apiUrl, user);
  }
}
