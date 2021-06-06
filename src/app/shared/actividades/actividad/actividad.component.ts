import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Actividad } from 'src/app/models/interface';
import { AdminService } from '../../../protected/services/admin.service';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {

  actividad: Actividad = {};

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.adminService.getActividadPorIdInicio(id)))
      .subscribe((actividad) => {
        this.actividad = actividad;
        //console.log(this.actividad);
      });
  }

  sesion(): boolean {
    if (sessionStorage.getItem('usuario')) {
      return true;
    }
    return false;
  }

}
