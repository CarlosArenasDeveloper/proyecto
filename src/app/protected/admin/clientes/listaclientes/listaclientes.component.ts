import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Usuario } from '../../../../models/interface';
import Swal from 'sweetalert2';

import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-listaclientes',
  templateUrl: './listaclientes.component.html',
  styleUrls: ['./listaclientes.component.css'],
})
export class ListaclientesComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  clientes: any = [];
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  url!: string;

  constructor(private adminService: AdminService,
  private translateService:TranslateService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('lang') == 'es') {
      this.url = '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json';
    } else {
      this.url = '//cdn.datatables.net/plug-ins/1.10.25/i18n/English.json';
    }

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: this.url,
      },
      responsive: true,
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
      title: `¿${this.translateService.instant('Estas seguro de querer eliminar a')} ${usuario.nombre?.toUpperCase()} ${usuario.apellido1?.toUpperCase()}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${this.translateService.instant('Si, eliminar')}`,
      cancelButtonText: `${this.translateService.instant('No, cancelar')}`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.borrarUsuario(usuario.email!).subscribe((usuario) => {
          this.clientes.splice(i, 1);
          if (this.clientes.length > 0) {
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
          title: `${this.translateService.instant('Cliente eliminado')}`,
          text: `${this.translateService.instant('Se ha borrado correctamente a')} ${usuario.nombre?.toUpperCase()} ${usuario.apellido1?.toUpperCase()}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }
}
