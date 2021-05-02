import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Tarifa, Usuario } from '../../auth/interfaces/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl: string = environment.baseUrl;

  constructor(private htpp: HttpClient) {}

  getClientes(): Observable<Usuario> {
    return this.htpp.get(`${this.baseUrl}/index.php`);
  }

  getMonitores() {
    return this.htpp.get(`${this.baseUrl}/selectMonitores.php`);
  }

  getCentro(id: number) {
    return this.htpp.get(`${this.baseUrl}/selectCentro.php?id=${id}`);
  }

  getUsuarioPorEmail(email: string): Observable<Usuario> {
    return this.htpp.get<Usuario>(
      `${this.baseUrl}/selectUsuario.php?email=${email}`
    );
  }

  borrarUsuario(email: string) {
    return this.htpp.get<Usuario>(
      `${this.baseUrl}/borrarUsuario.php?email=${email}`
    );
  }

  borrarMonitor(email: string) {
    return this.htpp.get<Usuario>(
      `${this.baseUrl}/borrarMonitor.php?email=${email}`
    );
  }

  editarCliente(cliente: Usuario) {
    return this.htpp.post<Usuario>(
      `${this.baseUrl}/editarCliente.php`,
      JSON.stringify(cliente)
    );
  }

  editarMonitor(monitor: Usuario) {
    return this.htpp.post<Usuario>(
      `${this.baseUrl}/editarMonitor.php`,
      JSON.stringify(monitor)
    );
  }

  darBaja(cliente: Usuario) {
    return this.htpp.post<Usuario>(
      `${this.baseUrl}/darBaja.php`,
      JSON.stringify(cliente)
    );
  }
  darAlta(cliente: Usuario) {
    return this.htpp.post<Usuario>(
      `${this.baseUrl}/darAlta.php`,
      JSON.stringify(cliente)
    );
  }

  addMonitor(usuario: Usuario): Observable<Usuario> {
    return this.htpp.post(
      `${this.baseUrl}/addMonitor.php`,
      JSON.stringify(usuario)
    );
  }
  addCliente(usuario: Usuario): Observable<Usuario> {
    return this.htpp.post(
      `${this.baseUrl}/addCliente.php`,
      JSON.stringify(usuario)
    );
  }
  getNombresClientes() {
    return this.htpp.get(`${this.baseUrl}/nombres.php`);
  }

  getTarifas(): Observable<Tarifa> {
    return this.htpp.get(`${this.baseUrl}/selectTarifas.php`);
  }

  addTarifa(tarifa: Tarifa): Observable<Tarifa> {
    return this.htpp.post(
      `${this.baseUrl}/addTarifa.php`,
      JSON.stringify(tarifa)
    );
  }
  borrarTarifa(id: number) {
    return this.htpp.get<Tarifa>(`${this.baseUrl}/borrarTarifa.php?id=${id}`);
  }
  getTarifaPorId(id: number) {
    return this.htpp.get<Tarifa>(
      `${this.baseUrl}/seleccionarTarifa.php?id=${id}`
    );
  }
  // editarTarifa(tarifa: Tarifa) {
  //   return this.htpp.post<Tarifa>(
  //     `${this.baseUrl}/editarTarifa.php`,
  //     JSON.stringify(tarifa)
  //   );
  // }
  editarTarifa(tarifa: Usuario) {
    return this.htpp.post(
      `${this.baseUrl}/editarTarifa.php`,
      JSON.stringify(tarifa)
    );
  }
}
