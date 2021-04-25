import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../auth/interfaces/interface';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
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
