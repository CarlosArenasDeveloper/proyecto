import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';
import { Centro, Usuario } from '../../../../models/interface';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-lista-centros',
  templateUrl: './lista-centros.component.html',
  styleUrls: ['./lista-centros.component.css'],
})
export class ListaCentrosComponent implements OnInit, OnDestroy {
  usuario!: Usuario;
  url!:string;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  centros: any = [];
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    const usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    this.usuario = usuario;

    if(localStorage.getItem('lang')=='es'){
      this.url='//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json'
    }else{
      this.url='//cdn.datatables.net/plug-ins/1.10.25/i18n/English.json'
    }

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: this.url,
      },
      responsive: true,
    };

    this.adminService.getCentros().subscribe((centros) => {
      this.centros = centros;
      this.dtTrigger.next();
    });
  }

  isAdmin() {
    
    if (this.usuario.role == 1) {
      return true;
    }
    return false;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  borrarCentro(centro: Centro, i: number) {
    this.adminService.getUsuariosGym(centro.id!).subscribe((numeroUsuarios) => {
      if (numeroUsuarios > 0) {
        Swal.fire({
          title: `Hay ${numeroUsuarios} usuarios que pertenecen al centro ${centro.nombre?.toUpperCase()}`,
          text: `Los usuarios serán eliminados al borrar el centro`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar',
          cancelButtonText: 'No, cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.adminService.borrarCentro(centro.id!).subscribe((centro) => {
              this.centros.splice(i, 1);
              if (this.centros.length > 0) {
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
              title: 'Centro eliminado correctamente',
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      } else {
        Swal.fire({
          title: `¿Estas seguro de querer eliminar ${centro.nombre?.toUpperCase()} ?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar',
          cancelButtonText: 'No, cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.adminService.borrarCentro(centro.id!).subscribe((centro) => {
              this.centros.splice(i, 1);
              if (this.centros.length > 0) {
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
              title: 'Centro eliminado correctamente',
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
  }

  ventanaModal() {}
}
