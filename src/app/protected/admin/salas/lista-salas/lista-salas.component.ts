import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';
import { Sala, Usuario } from '../../../../models/interface';
import { DataTableDirective } from 'angular-datatables';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddSalaComponent } from '../add-sala/add-sala.component';
import { EditSalaComponent } from '../edit-sala/edit-sala.component';

@Component({
  selector: 'app-lista-salas',
  templateUrl: './lista-salas.component.html',
  styleUrls: ['./lista-salas.component.css'],
})
export class ListaSalasComponent implements OnInit {
  usuario!: Usuario;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  salas: any = [];
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddSalaComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.adminService.getSalas().subscribe((salas) => {
        this.salas = salas;
        if (this.salas.length > 0) {
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
    });
  }

  editar(sala: Sala): void {
    const dialogRef = this.dialog.open(EditSalaComponent, {
      width: '350px',
      data: { id: sala.id, aforo: sala.aforo },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.adminService.getSalas().subscribe((salas) => {
        this.salas = salas;
        if (this.salas.length > 0) {
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
    });
  }

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

    this.adminService.getSalas().subscribe((salas) => {
      this.salas = salas;
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

  borrarSala(sala: Sala, i: number) {
    Swal.fire({
      title: `¿Estas seguro de querer eliminar la sala ${sala.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.borrarSala(sala.id!).subscribe((sala) => {
          this.salas.splice(i, 1);
          if (this.salas.length > 0) {
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
          title: 'Sala eliminada correctamente',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }
}
