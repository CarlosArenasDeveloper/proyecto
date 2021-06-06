import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Centro } from '../../../../models/interface';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-centro',
  templateUrl: './add-centro.component.html',
  styleUrls: ['./add-centro.component.css'],
})
export class AddCentroComponent implements OnInit {
  centro!: Centro;
  constructor(private fb: FormBuilder, private adminService: AdminService,private translateService:TranslateService) {}

  ngOnInit(): void {}

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
      return this.translateService.instant('El nº de telefono es requerido');
    } else if (errors?.pattern) {
      return this.translateService.instant('El valor ingresado no tiene formato de numero de telefono');
    }
    return '';
  }

  addCentro() {
    this.centro = this.miFormulario.value;
    this.adminService.addCentro(this.centro).subscribe((resp) => {
      //console.log(resp);
      if (resp == null) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title:`${this.translateService.instant('Centro añadido')}`,
          text: `${this.centro.nombre} ${this.translateService.instant('se ha añadido correctamente')}!`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }
}
