import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { AdminService } from '../../protected/services/admin.service';

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.css'],
})
export class CentrosComponent implements OnInit {


  propiedades: any;

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminService.getCentros().subscribe((centros) => {
      this.propiedades = centros;
    });
  }
}
