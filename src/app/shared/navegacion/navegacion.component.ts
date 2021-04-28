import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent {

  constructor(private route: Router) { }

  cerrarSesion(): void {
    console.log("logout");
    sessionStorage.removeItem('usuario')
    this.route.navigateByUrl("/")
  }

}

