import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../protected/services/admin.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  actividades: any = [];
  constructor(private adminService :AdminService) { }

  ngOnInit(): void {
    this.adminService.getActividades().subscribe((actividades) => {
      this.actividades = actividades;
      console.log(this.actividades);
    });
  }

}
