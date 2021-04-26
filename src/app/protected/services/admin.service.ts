import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../auth/interfaces/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl: string = environment.baseUrl;

  constructor(private htpp: HttpClient) {}

  getClientes(){
    return this.htpp.get(`${this.baseUrl}/index.php`);
  }

  getMonitores(){
    return this.htpp.get(`${this.baseUrl}/selectMonitores.php`);
  }
  
  getCentro(id: number) {
    return this.htpp.get(`${this.baseUrl}/selectCentro.php?id=${id}`);
  }

  getUsuarioPorEmail( email: string ):Observable<Usuario> {
    return this.htpp.get<Usuario>(`${ this.baseUrl }/selectUsuario.php?email=${email}`);
  }

  borrarUsuario(email:string){
    return  this.htpp.get<Usuario>(`${ this.baseUrl }/borrarUsuario.php?email=${email}`);
  }

  
  editarCliente(cliente:Usuario){
    return  this.htpp.post<Usuario>(`${this.baseUrl}/editarCliente.php`,JSON.stringify(cliente))
  }

  editarMonitor(monitor:Usuario){
    return  this.htpp.post<Usuario>(`${this.baseUrl}/editarMonitor.php`,JSON.stringify(monitor))
  }

  darBaja(cliente:Usuario){
    return  this.htpp.post<Usuario>(`${this.baseUrl}/darBaja.php`,JSON.stringify(cliente))
  }
  darAlta(cliente:Usuario){
    return  this.htpp.post<Usuario>(`${this.baseUrl}/darAlta.php`,JSON.stringify(cliente))
  }

  addMonitor(usuario: Usuario):Observable<Usuario> {
    return this.htpp.post(
      `${this.baseUrl}/addMonitor.php`,
      JSON.stringify(usuario)
    );
  }
}
