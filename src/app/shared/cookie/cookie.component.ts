import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.css']
})
export class CookieComponent implements OnInit {

  mostrarMensaje: boolean =true;
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('cookie')){
        this.mostrarMensaje=false;
    }
  }

  aceptar(){
    localStorage.setItem('cookie','true');
    this.mostrarMensaje=false;
  }

}
