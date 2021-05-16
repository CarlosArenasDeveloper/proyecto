import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Centro } from '../../../../models/interface';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-centro',
  templateUrl: './edit-centro.component.html',
  styleUrls: ['./edit-centro.component.css']
})
export class EditCentroComponent implements OnInit {

  centro: Centro={};
  id!: number;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.adminService.getCentroPorId(id)))
      .subscribe((centro) => {
        this.centro = centro;
        this.id = centro.id!;
      
        this.miFormulario.controls['nombre'].setValue(this.centro.nombre);
        this.miFormulario.controls['latitud'].setValue(this.centro.latitud);
        this.miFormulario.controls['longitud'].setValue(this.centro.longitud);
        this.miFormulario.controls['ubicacion'].setValue(this.centro.ubicacion);

        this.miFormulario.controls['direccion'].setValue(
          this.centro.direccion
        );
        this.miFormulario.controls['telefono'].setValue(this.centro.telefono);
      });
  }

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    telefono: [
      '',
      [Validators.required, Validators.pattern('^[6-7-9]{1}[0-9]{8}$')],
    ],
    latitud: ['', [Validators.required]],
    longitud: ['', [Validators.required]],
    ubicacion: ['', [Validators.required]],
  });

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  get telefonoErrorMsg(): string {
    const errors = this.miFormulario.get('telefono')?.errors;
    if (errors?.required) {
      return 'El nº de telefono es requerido';
    } else if (errors?.pattern) {
      return 'El valor ingresado no tiene formato de numero de telefono';
    }
    return '';
  }

  editarCentro() {
    this.centro = this.miFormulario.value;
    this.centro.id = this.id;
    this.adminService.editarCentro(this.centro).subscribe((resp) => {
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
