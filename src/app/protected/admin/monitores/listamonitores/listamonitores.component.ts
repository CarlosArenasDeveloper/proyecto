import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminService } from '../../../services/admin.service';
import { Usuario } from '../../../../models/interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-listamonitores',
  templateUrl: './listamonitores.component.html',
  styleUrls: ['./listamonitores.component.css'],
})
export class ListamonitoresComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  monitores: any = [];

  constructor(private adminService: AdminService) {}
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json',
      },
      responsive: true,
    };

    this.adminService.getMonitores().subscribe((clientes) => {
      this.monitores = clientes;
      this.dtTrigger.next();
    });
  }

  borrarMonitor(usuario: Usuario, i: number) {
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
        this.adminService.borrarMonitor(usuario.email!).subscribe((usuario) => {
          this.monitores.splice(i, 1);
        });

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Monitor eliminado!',
          text: `Se ha borrado correctamente a ${usuario.nombre?.toUpperCase()} ${usuario.apellido1?.toUpperCase()}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }
}
