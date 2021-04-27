import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../auth/interfaces/interface';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {
  usuario!:Usuario;

  constructor() {
  }
  ngOnInit(): void {
   const usuario= JSON.parse(sessionStorage.getItem('usuario')!);
   this.usuario=usuario;
   console.log(this.usuario);
  }


}
