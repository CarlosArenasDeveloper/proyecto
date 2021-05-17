import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, switchMapTo } from 'rxjs/operators';
import { AdminService } from '../../../protected/services/admin.service';
import { Ejercicio } from '../../../models/interface';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.css'],
})
export class EjercicioComponent implements OnInit {
  ejercicio!: Ejercicio;

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(switchMap(({ id }) => this.adminService.getEjercicioPorId(id)))
    .subscribe((ejercicio) => {
      this.ejercicio = ejercicio;
    });
  }
}
