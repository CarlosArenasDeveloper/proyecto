import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Tarifa } from '../../../../models/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-tarifa',
  templateUrl: './edit-tarifa.component.html',
  styleUrls: ['./edit-tarifa.component.css'],
})
export class EditTarifaComponent implements OnInit {
  tarifa: Tarifa={};
  id!: number;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.adminService.getTarifaPorId(id)))
      .subscribe((tarifa) => {
        this.tarifa = tarifa;
        this.id = tarifa.id!;
        this.miFormulario.controls['nombre'].setValue(this.tarifa.nombre);
        this.miFormulario.controls['descripcion'].setValue(
          this.tarifa.descripcion
        );
        this.miFormulario.controls['precio'].setValue(this.tarifa.precio);
      });
  }

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    precio: [
      '',
      [Validators.required, Validators.pattern('^[0-9]+([.][0-9]+)?$')],
    ],
  });

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  get precioMessage(): string {
    const errors = this.miFormulario.get('precio')?.errors;
    if (errors?.required) {
      return 'El precio es requerido';
    } else if (errors?.pattern) {
      return 'El valor introducido no corresponde con un precio valido';
    }
    return '';
  }

  editarTarifa() {
    this.tarifa = this.miFormulario.value;
    this.tarifa.id = this.id;
    this.adminService.editarTarifa(this.tarifa).subscribe((resp) => {
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
