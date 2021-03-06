import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tarifa, Usuario, Centro } from '../../models/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Usuario> {
    return this.http.get(
      `${this.baseUrl}/login.php?email=${email}&&password=${password}`
    );
  }

  registro(usuario: Usuario):Observable<Usuario> {
    return this.http.post(
      `${this.baseUrl}/registroCliente.php`,
      JSON.stringify(usuario)
    );
  }

  selectTarifas(): Observable<Tarifa> {
    return this.http.get(`${this.baseUrl}/selectTarifas.php`);
  }
  selectCentros(): Observable<Centro> {
    return this.http.get(`${this.baseUrl}/selectCentros.php`);
  }

  passwordOlvidada(email:string){
    return this.http.post(`${this.baseUrl}/passwordOlvidada.php`,JSON.stringify({email:email}))
  }
  
  reestablecerPassword(usuario: Usuario){
    return this.http.post(`${this.baseUrl}/reestablecerPassword.php`,JSON.stringify(usuario))
  }

  enviarVerificacionBis(email:string){
    return this.http.post(`${this.baseUrl}/enviarVerificacionBis.php`,JSON.stringify({email:email}))

  }

  solicitudAlta(email:string){
    return this.http.get(`${this.baseUrl}/altaEmail.php?email=${email}`);
  }

  confirmarAlta(usuario: Usuario):Observable<Usuario> {
    return this.http.post(
      `${this.baseUrl}/confirmarAlta.php`,
      JSON.stringify(usuario)
    );
  }
  getCentroCordoba(): Observable<Centro> {
    return this.http.get(`${this.baseUrl}/selectCentroCordoba.php`);
  }

  getUsuarioPorEmail(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(
      `${this.baseUrl}/seleccionarUsuario.php?email=${email}`
    );
  }

}
