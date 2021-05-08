import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Ejercicio } from '../../../../models/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-ejercicio',
  templateUrl: './edit-ejercicio.component.html',
  styleUrls: ['./edit-ejercicio.component.css']
})
export class EditEjercicioComponent implements OnInit {

  ejercicio: Ejercicio={};
  id!: number;
  musculos: any;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adminService.getMusculos().subscribe(musculo=>{
      this.musculos=musculo;
    })
    
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.adminService.getEjercicioPorId(id)))
      .subscribe((ejercicio) => {
        this.ejercicio = ejercicio;
        this.id = ejercicio.id!;
        this.miFormulario.controls['nombre'].setValue(this.ejercicio.nombre);
        this.miFormulario.controls['descripcion'].setValue(
          this.ejercicio.descripcion
        );
        this.miFormulario.controls['nombre_musculo'].setValue(this.ejercicio.nombre_musculo);
        this.miFormulario.controls['video'].setValue(this.ejercicio.video);
        this.miFormulario.controls['imagen'].setValue(this.ejercicio.imagen);
        this.miFormulario.controls['nivel'].setValue(this.ejercicio.nivel);
        this.miFormulario.controls['tipo'].setValue(this.ejercicio.tipo);
        this.miFormulario.controls['equipo'].setValue(this.ejercicio.equipo);



      });
  }

  
  miFormulario: FormGroup = this.fb.group({
    nombre:['',[Validators.required]],
    nombre_musculo:['',[Validators.required]],
    nivel:['',[Validators.required]],
    equipo:['',[Validators.required]],
    tipo:['',[Validators.required]],
    descripcion:['',[Validators.required]],
    imagen:[''],
    video:[''],

});

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  editarEjercicio() {
    this.ejercicio = this.miFormulario.value;
    this.ejercicio.id = this.id;
    this.adminService.editarEjercicio(this.ejercicio).subscribe((resp) => {
      if (resp == null) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Datos correctamente actualizados',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }

}
