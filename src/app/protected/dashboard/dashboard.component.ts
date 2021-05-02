import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../auth/interfaces/interface';

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

  monitores() {
    this.route.navigateByUrl('dashboard/admin/listamonitores');
  }

  clientes() {
    this.route.navigateByUrl('dashboard/admin/listaclientes');
  }

  tarifas() {
    this.route.navigateByUrl('dashboard/admin/tarifas');
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
}
