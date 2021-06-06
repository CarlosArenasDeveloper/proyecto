import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/interface';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css'],
})
export class NavegacionComponent implements OnInit {
  usuario!: any;
  lang: any;

  constructor(private route: Router) {}
  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'es';

    if (sessionStorage.getItem('usuario')) {
      this.usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    }
  }

  changeLang(lang: any) {
    localStorage.setItem('lang', lang);
    // sessionStorage.removeItem('usuario')
    this.route.navigateByUrl('/').then(()=>{
      location.reload();

    });
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('usuario');
    this.route.navigateByUrl('/dashboard');
  }

  sesion(): boolean {
    if (sessionStorage.getItem('usuario')) {
      return true;
    }
    return false;
  }

  cliente() {
    if (sessionStorage.getItem('usuario')) {
      const usuario: Usuario = JSON.parse(sessionStorage.getItem('usuario')!);
      if (usuario.role == 2) {
        return true;
      }
      return false;
    }
    return false;
  }

  panel() {
    if (!sessionStorage.getItem('usuario')) {
      this.route.navigateByUrl('/');
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
