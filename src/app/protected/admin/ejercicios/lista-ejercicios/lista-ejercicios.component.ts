import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Ejercicio } from '../../../../models/interface';

@Component({
  selector: 'app-lista-ejercicios',
  templateUrl: './lista-ejercicios.component.html',
  styleUrls: ['./lista-ejercicios.component.css']
})
export class ListaEjerciciosComponent implements OnInit,OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  ejercicios: any = [];
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  url!:string;

  constructor(private adminService: AdminService) {}

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
        url: this.url,
      },
      responsive: true,
    };


    this.adminService.getEjercicios().subscribe((ejercicios) => {
      this.ejercicios = ejercicios;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  borrarEjercicio(ejercicio: Ejercicio, i: number) {
    Swal.fire({
      title: `¿Estas seguro de querer eliminar el  ${ejercicio.nombre?.toUpperCase()} de la lista de ejercicios?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.borrarEjercicio(ejercicio.id!).subscribe((ejercicio) => {
          this.ejercicios.splice(i, 1);
          if (this.ejercicios.length > 0) {
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
          title: 'Ejercicio eliminado correctamente',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }


}
