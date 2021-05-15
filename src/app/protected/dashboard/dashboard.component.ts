import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  panelOpenState = false;

  usuario!: Usuario;

  constructor(private route: Router) {}

  ngOnInit(): void {
    const usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    this.usuario = usuario;
  }

  sesion(): boolean {
    if (sessionStorage.getItem('usuario')) {
      return true;
    }
    return false;
  }

  isAdmin() {
    if (this.usuario.role == 1) {
      return true;
    }
    return false;
  }
  
  isMonitor() {
    if (this.usuario.role == 3) {
      return true;
    }
    return false;
  }

  isCliente() {
    if (this.usuario.role == 2) {
      return true;
    }
    return false;
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('usuario')
    this.route.navigateByUrl("/")
  }

  editarPerfil(){
    this.route.navigateByUrl("/dashboard/admin/editar-perfil")
  }
  
  panel() {
    if (!sessionStorage.getItem('usuario')) {
      this.route.navigateByUrl('dashboard');
      return;
    }

    const usuario: Usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    if (usuario.role == 1) {
      this.route.navigateByUrl('dashboard/admin');
    } else if (usuario.role == 2) {
      this.route.navigateByUrl('dashboard/cliente');
    } else {
      this.route.navigateByUrl('dashboard/monitor');
    }
  }
}
