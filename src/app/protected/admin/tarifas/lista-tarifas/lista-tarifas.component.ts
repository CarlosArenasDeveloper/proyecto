import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import { Usuario, Tarifa } from '../../../../auth/interfaces/interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-tarifas',
  templateUrl: './lista-tarifas.component.html',
  styleUrls: ['./lista-tarifas.component.css']
})
export class ListaTarifasComponent implements OnInit,OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  tarifas: any = [];

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


    this.adminService.getTarifas().subscribe((tarifas) => {
      this.tarifas = tarifas;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  borrarTarifa(tarifa: Tarifa, i: number) {
    Swal.fire({
      title: `¿Estas seguro de querer eliminar la tarifa ${tarifa.nombre?.toUpperCase()}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.borrarTarifa(tarifa.id!).subscribe((tarifa) => {
          this.tarifas.splice(i, 1);
        });
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tarifa eliminada correctamente',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }

}
