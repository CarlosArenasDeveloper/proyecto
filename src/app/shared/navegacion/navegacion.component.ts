import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../auth/interfaces/interface';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent {

  constructor(private route: Router) { }

  cerrarSesion(): void {
    sessionStorage.removeItem('usuario')
    this.route.navigateByUrl("/dashboard")
  }

  sesion():boolean{

    if(sessionStorage.getItem('usuario')){
      return true;
    }
    return false;
  }

  panel(){
    
    if(!sessionStorage.getItem('usuario')){
      this.route.navigateByUrl("dashboard")
      return;
    }

    const usuario :Usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    if(usuario.role==1){
      this.route.navigateByUrl("dashboard/admin")

    }else if(usuario.role==2){
      this.route.navigateByUrl("dashboard/cliente")

    }else{
      this.route.navigateByUrl("dashboard/monitor")

    }
  }
}

