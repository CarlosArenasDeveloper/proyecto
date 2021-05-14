import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../../../protected/services/admin.service';

@Component({
  selector: 'app-actividades-por-tarifa',
  templateUrl: './actividades-por-tarifa.component.html',
  styleUrls: ['./actividades-por-tarifa.component.css'],
})
export class ActividadesPorTarifaComponent implements OnInit {
  actividades!: any;

  constructor(
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, nombre:string }
  ) {}

  ngOnInit(): void {
    this.adminService.getActividadesPorTarifa(this.data.id).subscribe((actividades) => {
      this.actividades = '';
      this.actividades = actividades;
    });
  }
}
