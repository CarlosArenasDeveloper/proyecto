import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Musculo } from 'src/app/models/interface';
import { AdminService } from '../../../protected/services/admin.service';

@Component({
  selector: 'app-musculo',
  templateUrl: './musculo.component.html',
  styleUrls: ['./musculo.component.css'],
})
export class MusculoComponent implements OnInit {
  musculo: Musculo = {};
  nombre_musculo!: string;
  ejercicios!: any;
  existenEjercicios:boolean =true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ nombre }) => {
          this.nombre_musculo=nombre;
          return this.adminService.getMusculoPorNombre(nombre);
        })
      )
      .subscribe((musculo) => {
        this.musculo = musculo;
      });

    this.adminService
      .getEjerciciosPorMusculo(this.nombre_musculo)
      .subscribe((ejercicios) => {
        if(ejercicios!="error"){
          this.ejercicios = ejercicios;
        }else{
          this.existenEjercicios=false;
        }
      });
  }
}
