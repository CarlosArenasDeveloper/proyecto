import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Usuario, UserData } from '../../../../auth/interfaces/interface';
import Swal from 'sweetalert2';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-listaclientes',
  templateUrl: './listaclientes.component.html',
  styleUrls: ['./listaclientes.component.css'],
})
export class ListaclientesComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  clientes: any = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json',
      },
      responsive: true   
    };


    this.adminService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  borrarCliente(usuario: Usuario, i: number) {
    Swal.fire({
      title: `¿Estas seguro de querer eliminar a ${usuario.nombre?.toUpperCase()} ${usuario.apellido1?.toUpperCase()}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.borrarUsuario(usuario.email!).subscribe((usuario) => {
          this.clientes.splice(i, 1);
        });
        Swal.fire(
          'Cliente eliminado!',
          `Se ha borrado correctamente a ${usuario.nombre?.toUpperCase()} ${usuario.apellido1?.toUpperCase()}`,
          'success'
        );
      }
    });
  }
}
