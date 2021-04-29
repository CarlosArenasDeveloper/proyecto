import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './auth/interfaces/interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fitandhealthy';

  // usuario!:Usuario;

  // constructor(private route: Router) {
  // }
  // ngOnInit(): void {
  //  const usuario= JSON.parse(sessionStorage.getItem('usuario')!);
  //  this.usuario=usuario;
  // }

  // monitores(){
  //   this.route.navigateByUrl("dashboard/admin/listamonitores")
  // }

  // clientes(){
  //   this.route.navigateByUrl("dashboard/admin/listaclientes")

  // }
}
