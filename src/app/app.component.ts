import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './models/interface';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'fitandhealthy';
  constructor(private translateService : TranslateService){
    this.translateService.setDefaultLang('es');
    this.translateService.use(localStorage.getItem('lang')||'es');
  }
  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;
    
  }
}
