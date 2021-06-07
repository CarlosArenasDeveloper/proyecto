import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';
import { Categoria, Usuario } from '../../../../models/interface';
import { DataTableDirective } from 'angular-datatables';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoriaComponent } from '../add-categoria/add-categoria.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css'],
})
export class ListaCategoriasComponent implements OnInit, OnDestroy {
  usuario!: Usuario;
  url!:string;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  categorias: any = [];
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    private router: Router,
    private translateService:TranslateService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCategoriaComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.adminService.getCategorias().subscribe((categorias) => {
        this.categorias = categorias;
        if (this.categorias.length > 0) {
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

    this.adminService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  isAdmin() {
    if (this.usuario.role == 1) {
      return true;
    }
    return false;
  }

  noticias() {
    if(this.usuario.role==1){
      this.router.navigateByUrl("dashboard/admin/noticias")
    }else{
      this.router.navigateByUrl("dashboard/monitor/noticias")
    }  }

  borrarCategoria(categoria: Categoria, i: number) {
    Swal.fire({
      title: `¿Estas seguro de querer eliminar la categoria ${categoria.nombre?.toUpperCase()}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${this.translateService.instant('Si, eliminar')}`,
      cancelButtonText: `${this.translateService.instant('No, cancelar')}`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService
          .borrarCategoria(categoria.id!)
          .subscribe((categoria) => {
            this.categorias.splice(i, 1);
            if (this.categorias.length > 0) {
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
          title: `${this.translateService.instant('Categoria eliminada correctamente')}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }
}
