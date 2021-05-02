import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';
import { Centro } from '../../../../models/interface';

@Component({
  selector: 'app-lista-centros',
  templateUrl: './lista-centros.component.html',
  styleUrls: ['./lista-centros.component.css']
})
export class ListaCentrosComponent implements OnInit,OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  centros: any = [];

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


    this.adminService.getCentros().subscribe((centros) => {
      this.centros = centros;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  borrarCentro(centro: Centro, i: number) {
    Swal.fire({
      title: `¿Estas seguro de querer eliminar el centro ${centro.nombre?.toUpperCase()}?`,
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


}
