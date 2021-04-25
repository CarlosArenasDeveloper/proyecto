import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Usuario } from '../../../auth/interfaces/interface';

@Component({
  selector: 'app-listaclientes',
  templateUrl: './listaclientes.component.html',
  styleUrls: ['./listaclientes.component.css']
})
export class ListaclientesComponent implements OnInit {

 
  clientes: any = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService
      .getClientes()
      .subscribe((clientes) => (this.clientes = clientes));
  }

  editarCliente() {}

  borrarCliente(usuario: Usuario, i: number) {
    this.adminService.borrarCliente(usuario.email!).subscribe((usuario) => {
      this.clientes.splice(i,1)
    });
  }

}
