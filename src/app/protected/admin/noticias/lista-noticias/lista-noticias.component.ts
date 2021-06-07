import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Noticia, Usuario } from '../../../../models/interface';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lista-noticias',
  templateUrl: './lista-noticias.component.html',
  styleUrls: ['./lista-noticias.component.css'],
})
export class ListaNoticiasComponent implements OnInit, OnDestroy {
  usuario!: Usuario;
  url!:string;
  editor!:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  noticias: any = [];
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  constructor(private adminService: AdminService,private router :Router,private translateService:TranslateService) {}

  ngOnInit(): void {
    const usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    this.usuario = usuario;
    this.editor=`${this.usuario.nombre} ${this.usuario.apellido1} ${this.usuario.apellido2}`;

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

    this.adminService.getNoticias().subscribe((noticias) => {
      this.noticias = noticias;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  categorias() {
    if(this.usuario.role==1){
      this.router.navigateByUrl("dashboard/admin/categorias")
    }else{
      this.router.navigateByUrl("dashboard/monitor/categorias")
    }
  }

  borrarNoticia(noticia: Noticia, i: number) {
    Swal.fire({
      title: `¿${this.translateService.instant('Estas seguro de querer eliminar la noticia')} "${noticia.titulo?.toUpperCase()}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${this.translateService.instant('Si, eliminar')}`,
      cancelButtonText: `${this.translateService.instant('No, cancelar')}`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.borrarNoticia(noticia.id!).subscribe((noticia) => {
          
          this.noticias.splice(i, 1);
          if (this.noticias.length > 0) {
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
          title: `${this.translateService.instant('Noticia eliminada correctamente')}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }

  errorPermisos(){
    Swal.fire({
      position:'top-right',
      icon: 'error',
      title: `${this.translateService.instant('Permisos insuficientes')}`,
      timer: 3000,
      showConfirmButton: false,
      text:`${this.translateService.instant('No puede modificar una noticia en la cual usted no sea el editor')}`
      });
  }

  
}
