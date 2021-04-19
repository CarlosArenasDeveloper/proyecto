import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../auth/interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getUsuarios() {
    return this.http.get(`${this.baseUrl}/index.php`);
  }

  getUsuario(usuario: User) {
    return this.http.post(`${this.baseUrl}/login.php`, JSON.stringify(usuario));
  }
}
