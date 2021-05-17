import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/interface';
import { AdminService } from 'src/app/protected/services/admin.service';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.css']
})
export class EjerciciosComponent implements OnInit {

  musculos: any = [];
  constructor(private adminService :AdminService, private router:Router) { }

  ngOnInit(): void {
    this.adminService.getMusculos().subscribe((musculos) => {
      this.musculos = musculos;
    });
  }

  sesion(): boolean {
    if (sessionStorage.getItem('usuario')) {
      return true;
    }
    return false;
  }

  inicio(){
    const usuario: Usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    if (usuario.role == 1) {
      this.router.navigateByUrl('dashboard/admin');
    } else if (usuario.role == 2) {
      this.router.navigateByUrl('dashboard/cliente');
    } else {
      this.router.navigateByUrl('dashboard/monitor');
    }
  }
}
