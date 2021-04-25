import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {
  usuario:any;

  constructor() {
  }
  ngOnInit(): void {
   const usuario= sessionStorage.getItem('usuario');
   this.usuario=usuario;
   console.log(this.usuario);
  }


}
