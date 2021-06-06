import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  login(){
this.router.navigateByUrl('./auth/login')
  }

  registro(){
    this.router.navigateByUrl('./auth/registro')

  }

  centros(){
    this.router.navigateByUrl('./centros')

  }

}
