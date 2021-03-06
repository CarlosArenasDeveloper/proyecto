import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import { Usuario, Tarifa } from '../../../../models/interface';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lista-tarifas',
  templateUrl: './lista-tarifas.component.html',
  styleUrls: ['./lista-tarifas.component.css']
})
export class ListaTarifasComponent implements OnInit,OnDestroy {

  usuario!:Usuario
  url!:string;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  tarifas: any = [];
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  constructor(private adminService: AdminService,private translateService:TranslateService) {}

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
      responsive: true   
    };


    this.adminService.getTarifas().subscribe((tarifas) => {
      this.tarifas = tarifas;
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

  borrarTarifa(tarifa: Tarifa, i: number) {
    Swal.fire({
      title:`${this.translateService.instant('Eliminar tarifa')}`,
      text: `¿${this.translateService.instant('Estas seguro de querer eliminar la tarifa')} ${tarifa.nombre?.toUpperCase()}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${this.translateService.instant('Si, eliminar')}`,
      cancelButtonText: `${this.translateService.instant('No, cancelar')}`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.borrarTarifa(tarifa.id!).subscribe((tarifa) => {
          this.tarifas.splice(i, 1);
          if (this.tarifas.length > 0) {
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
          title: `${this.translateService.instant('Tarifa eliminada correctamente')}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }

}
