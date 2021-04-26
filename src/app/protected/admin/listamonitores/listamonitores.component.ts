import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/admin.service';
import { Usuario } from '../../../auth/interfaces/interface';

@Component({
  selector: 'app-listamonitores',
  templateUrl: './listamonitores.component.html',
  styleUrls: ['./listamonitores.component.css']
})
export class ListamonitoresComponent implements OnInit {

 
  monitores: any = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService
      .getMonitores()
      .subscribe((monitores) => (this.monitores = monitores));
  }

  editarCliente() {}

  borrarMonitor(usuario: Usuario, i: number) {
    Swal.fire({
      title: `¿Estas seguro de querer eliminar a ${usuario.nombre?.toUpperCase()} ${usuario.apellido1?.toUpperCase()}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.borrarUsuario(usuario.email!).subscribe((usuario) => {
          this.monitores.splice(i,1)
        });

        Swal.fire(
          'Monitor eliminado!',
          `Se ha borrado correctamente a ${usuario.nombre?.toUpperCase()} ${usuario.apellido1?.toUpperCase()}`,
          'success'
        )
      }
    })
    
  }
}
