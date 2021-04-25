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

  getClientePorEmail( email: string ):Observable<Usuario> {
    return this.htpp.get<Usuario>(`${ this.baseUrl }/selectCliente.php?email=${email}`);
  }

  borrarCliente(email:string){
    return  this.htpp.get<Usuario>(`${ this.baseUrl }/borrarCliente.php?email=${email}`);
  }

  editarCliente(cliente:Usuario){
    return  this.htpp.post<Usuario>(`${this.baseUrl}/editarCliente.php`,JSON.stringify(cliente))
  }

}
