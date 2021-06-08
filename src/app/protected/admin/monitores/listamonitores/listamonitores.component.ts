import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminService } from '../../../services/admin.service';
import { Usuario } from '../../../../models/interface';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-listamonitores',
  templateUrl: './listamonitores.component.html',
  styleUrls: ['./listamonitores.component.css'],
})
export class ListamonitoresComponent implements OnInit,OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  monitores: any = [];
  usuario!: Usuario;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  url!:string;
  constructor(private adminService: AdminService,private translateService:TranslateService) {}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    const usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    this.usuario = usuario;
    
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

    this.adminService.getMonitores().subscribe((clientes) => {
      this.monitores = clientes;
      this.dtTrigger.next();
    });
  }

  isAdmin() {
    if (this.usuario.role == 1) {
      return true;
    }
    return false;
  }
  
  borrarMonitor(usuario: Usuario, i: number) {
    Swal.fire({
      title: `${this.translateService.instant('Estas seguro de querer eliminar a')} ${usuario.nombre?.toUpperCase()} ${usuario.apellido1?.toUpperCase()}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${this.translateService.instant('Si, eliminar')}`,
      cancelButtonText: `${this.translateService.instant('No, cancelar')}`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.borrarMonitor(usuario.email!).subscribe((usuario) => {
          this.monitores.splice(i, 1);
          if (this.monitores.length > 0) {
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
          title: `${this.translateService.instant('Monitor eliminado')}!`,
          text: `${this.translateService.instant('Se ha borrado correctamente a')} ${usuario.nombre?.toUpperCase()} ${usuario.apellido1?.toUpperCase()}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }
}
