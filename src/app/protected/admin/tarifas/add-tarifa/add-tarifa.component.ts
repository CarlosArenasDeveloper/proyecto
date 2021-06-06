import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Tarifa } from '../../../../models/interface';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-tarifa',
  templateUrl: './add-tarifa.component.html',
  styleUrls: ['./add-tarifa.component.css'],
})
export class AddTarifaComponent implements OnInit {
  tarifa!: Tarifa;
  constructor(private fb: FormBuilder, private adminService: AdminService,private translateService:TranslateService) {}

  ngOnInit(): void {}

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
      return `${this.translateService.instant('El precio es requerido')}`;
    } else if (errors?.pattern) {
      return `${this.translateService.instant('El valor introducido no corresponde con un precio valido')}`;
    }
    return '';
  }

  addTarifa() {
    this.tarifa = this.miFormulario.value;
    this.adminService.addTarifa(this.tarifa).subscribe((resp) => {
      //console.log(resp);
      if (resp == null) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title:`${this.translateService.instant('Tarifa añadida')}!`,
          text: `${this.translateService.instant('La tarifa')} ${this.tarifa.nombre} ${this.translateService.instant('se ha añadido correctamente')}!`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }
}
