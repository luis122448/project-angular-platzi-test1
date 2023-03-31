import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { map, switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.API_URL + '/api/auth';
  // Creando un estado global
  private user = new BehaviorSubject<User | null>(null);
  myUser$ = this.user.asObservable();

  constructor(
    private httpCliente: HttpClient,
    private tokenService: TokenService
  ) { }

  postLogin(email: string, password: string) {
    return this.httpCliente.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      // Guardando en Local Storage
      tap(data => this.tokenService.putSave(data.access_token))
    )
  }

  // getProfile(token : string) {
  //   // const headers = new HttpHeaders();
  //   // headers.set('Authorization', `Bearer ${token}`)
  //   return this.httpCliente.get<User>(`${this.apiUrl}/profile`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //       // 'Content-type':'application.json'
  //     }
  //   });
  // }

  getProfile() {
    // const headers = new HttpHeaders();
    // headers.set('Authorization', `Bearer ${token}`)
    return this.httpCliente.get<User>(`${this.apiUrl}/profile`)
    .pipe(
      // Necesito relacisar una acccion Tap
      // Necesito trabajar entre dos Observadores swichMap
      tap(data => this.user.next(data))
    );
  }

  // onLoginAndProfile(email: string, password: string){
  //   return this.httpCliente.post<Auth>(`${this.apiUrl}/login`, {email, password})
  //   .pipe(
  //     switchMap((data) => this.httpCliente.get<User>(`${this.apiUrl}/profile`, {
  //       headers: {
  //         Authorization: `Bearer ${data.access_token}`}
  //       })));
  // }

  // Login and Profile - Simplificado
  onLoginAndProfile(email: string, password: string){
    return this.postLogin(email, password)
    .pipe(
      switchMap(() => this.getProfile())
    )
  }

  // onLoginAndProfile(email: string, password: string){
  //   return this.httpCliente.post<Auth>(`${this.apiUrl}/login`, {email, password})
  //   .pipe(
  //     tap((response => this.tokenService.putSave(response.access_token))))
  //   .pipe(
  //     switchMap(() => this.httpCliente.get<User>(`${this.apiUrl}/profile`)));
  // }

  onLogout(){
    this.tokenService.delLocal();
  }

}
