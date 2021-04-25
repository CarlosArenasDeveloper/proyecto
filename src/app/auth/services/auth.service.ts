import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tarifa, Usuario, Centro } from '../interfaces/interface';
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

  registro(usuario: Usuario) {
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
}
