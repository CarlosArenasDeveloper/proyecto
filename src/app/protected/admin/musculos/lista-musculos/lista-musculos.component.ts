import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Musculo } from '../../../../models/interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lista-musculos',
  templateUrl: './lista-musculos.component.html',
  styleUrls: ['./lista-musculos.component.css']
})
export class ListaMusculosComponent implements OnInit,OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  musculos: any = [];
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  url!:string
  constructor(private adminService: AdminService,private translateService:TranslateService) {}

  ngOnInit(): void {
    if(localStorage.getItem('lang')=='es'){
      this.url='//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json'
    }else{
      this.url='//cdn.datatables.net/plug-ins/1.10.25/i18n/English.json'
    }

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: this.url
      },
      responsive: true   
    };


    this.adminService.getMusculos().subscribe((musculos) => {
      this.musculos = musculos;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  borrarMusculo(musculo: Musculo, i: number) {
    Swal.fire({
      title: `${this.translateService.instant('¿Estas seguro de querer eliminar el')}  ${musculo.nombre?.toUpperCase()} ${this.translateService.instant('de la lista de musculos')}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${this.translateService.instant('Si, eliminar')}`,
      cancelButtonText: `${this.translateService.instant('No, cancelar')}`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.borrarMusculo(musculo.nombre!).subscribe((musculo) => {
          this.musculos.splice(i, 1);
          if (this.musculos.length > 0) {
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
          title: `${this.translateService.instant('Musculo eliminado correctamente')}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }


}
