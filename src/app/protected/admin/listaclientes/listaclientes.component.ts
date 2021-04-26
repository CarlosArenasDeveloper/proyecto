import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Usuario } from '../../../auth/interfaces/interface';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: `¿Estas seguro de querer eliminar a ${usuario.nombre?.toUpperCase()} ${usuario.apellido1?.toUpperCase()}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.borrarCliente(usuario.email!).subscribe((usuario) => {
          this.clientes.splice(i,1)
        });

        Swal.fire(
          'Cliente eliminado!',
          `Se ha borrado correctamente a ${usuario.nombre?.toUpperCase()} ${usuario.apellido1?.toUpperCase()}`,
          'success'
        )
      }
    })
    
  }

}
