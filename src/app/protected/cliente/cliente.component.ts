import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
    // if(!sessionStorage.getItem('usuario')){
    //   this.router.navigateByUrl('/auth/login');
    // }
  }

}
