import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Sesion, Usuario } from '../../../../models/interface';
@Component({
  selector: 'app-lista-sesiones',
  templateUrl: './lista-sesiones.component.html',
  styleUrls: ['./lista-sesiones.component.css']
})
export class ListaSesionesComponent implements OnInit,OnDestroy {

  usuario!:Usuario
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  sesiones: any = [];
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    const usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    this.usuario = usuario;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json',
      },
      responsive: true,
    };

    this.adminService.getSesiones().subscribe((sesiones) => {
      this.sesiones = sesiones;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

 
  isAdmin(){
    if (this.usuario.role == 1) {
      return true;
    }
    return false;
  }

  borrarSesion(sesion: Sesion, i: number) {
    Swal.fire({
      title: `¿Estas seguro de querer eliminar la sesion?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.borrarSesion(sesion.id!).subscribe((sesion) => {
          this.sesiones.splice(i, 1);
          if (this.sesiones.length > 0) {
            this.datatableElement.dtInstance.then(
              (dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next();
              }
            );
          } else {
            this.datatableElement.dtInstance.then(
              (dtInstance: DataTables.Api) => {
                dtInstance.destroy();
              }
            );
          }
        });
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Sesion eliminada correctamente',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }

}
