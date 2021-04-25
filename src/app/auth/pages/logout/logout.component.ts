import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styles: [
  ]
})
export class LogoutComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
    console.log("logout");
    sessionStorage.removeItem('usuario')
    this.route.navigateByUrl("/")
  }

}
