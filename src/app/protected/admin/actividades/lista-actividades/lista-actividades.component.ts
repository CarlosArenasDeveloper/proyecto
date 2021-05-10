import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Actividad, Usuario } from '../../../../models/interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-actividades',
  templateUrl: './lista-actividades.component.html',
  styleUrls: ['./lista-actividades.component.css']
})
export class ListaActividadesComponent implements OnInit , OnDestroy{

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  actividades: any = [];
  usuario!: Usuario;

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  constructor(private adminService: AdminService,private router :Router) {}

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

    this.adminService.getActividades().subscribe((actividades) => {
      this.actividades = actividades;
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

  categorias() {
  this.router.navigateByUrl("dashboard/admin/categorias")
  }

  borrarActividad(actividad: Actividad, i: number) {
    Swal.fire({
      title: `¿Estas seguro de querer eliminar ${actividad.nombre?.toUpperCase()} de la lista de actividades?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.borrarActividad(actividad.id!).subscribe((actividad) => {
          this.actividades.splice(i, 1);
          if (this.actividades.length > 0) {
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
          title: 'actividad eliminada correctamente',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }

}
