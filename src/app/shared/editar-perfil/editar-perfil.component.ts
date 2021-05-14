import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../../protected/services/admin.service';
import { ValidatorService } from '../../auth/services/validator.service';
import { AuthService } from '../../auth/services/auth.service';
import { Usuario, PasswordPerfil } from '../../models/interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css'],
})
export class EditarPerfilComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private authService: AuthService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 18, 0, 0);
    this.centros = [];
  }
  minDate!: Date;
  maxDate!: Date;
  centros: any;
  tarifas: any;
  role!: number;
  cambiarPass: boolean = false;
  passwordPerfil!: PasswordPerfil;
  centro!: any;
  tarifa!:any;
  reservas!:any;
  estado!:any;

  usuario: Usuario = {};

  formPassword: FormGroup = this.fb.group(
    {
      passwordactual: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', []],
    },
    {
      validators: [
        this.validatorService.camposIguales('password', 'password2'),
      ],
    }
  );

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido1: ['', [Validators.required]],
    apellido2: [''],
    dni: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$|^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$'
        ),
      ],
    ],
    fecha_nac: ['', [Validators.required]],
    sexo: [''],
    telefono: [
      '',
      [Validators.required, Validators.pattern('^[6-7]{1}[0-9]{8}$')],
    ],
    cuenta_bancaria: [
      '',
      [Validators.required, Validators.pattern('[a-zA-Z]{2}[0-9]{22}$')],
    ],
    ciudad: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    cod_postal: ['', [Validators.required]],
    email: [`${this.usuario.email}`],
  });

  ngOnInit(): void {
    this.authService.selectCentros().subscribe((resp) => {
      this.centros = resp;
      console.log(this.centros);
    });

    this.authService.selectTarifas().subscribe((resp) => {
      this.tarifas = resp;
    });

    this.activatedRoute.params
      .pipe(
        switchMap(({ email }) => this.adminService.getUsuarioPorEmail(email))
      )
      .subscribe((usuario) => {
        this.usuario = usuario;
        if (this.usuario.role == 1) {
          this.role = 1;
        } else if (this.usuario.role == 3) {
          this.adminService
            .getCentroPorId(this.usuario.id_centro!)
            .subscribe((centro) => {
              this.centro = centro.nombre;
            });
          this.role = 3;
        }else if(this.usuario.role==2){
          this.adminService
          .getCentroPorId(this.usuario.id_centro!)
          .subscribe((centro) => {
            this.centro = centro.nombre;
          });

          this.adminService.getTarifaPorId(this.usuario.id_tarifa!).subscribe((tarifa)=>{
            this.tarifa= tarifa.nombre
          })
        this.role = 2;
        this.reservas=this.usuario.num_reservas
        this.estado=this.usuario.estado
        }

        this.miFormulario.controls['email'].setValue(this.usuario.email);

        this.miFormulario.controls['dni'].setValue(this.usuario.dni);
        this.miFormulario.controls['nombre'].setValue(this.usuario.nombre);
        this.miFormulario.controls['apellido1'].setValue(
          this.usuario.apellido1
        );
        this.miFormulario.controls['apellido2'].setValue(
          this.usuario.apellido2
        );
        this.miFormulario.controls['fecha_nac'].setValue(
          this.usuario.fecha_nac
        );
        this.miFormulario.controls['sexo'].setValue(this.usuario.sexo);
        this.miFormulario.controls['telefono'].setValue(this.usuario.telefono);
        this.miFormulario.controls['cuenta_bancaria'].setValue(
          this.usuario.cuenta_bancaria
        );
        this.miFormulario.controls['ciudad'].setValue(this.usuario.ciudad);
        this.miFormulario.controls['direccion'].setValue(
          this.usuario.direccion
        );
        this.miFormulario.controls['cod_postal'].setValue(
          this.usuario.cod_postal
        );

      });
  }

  editar(): void {
    this.usuario = this.miFormulario.value;
    this.usuario.role = this.role;

      this.adminService.editarAdmin(this.usuario).subscribe((resp) => {
        if (resp) {
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
  

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  campoNoValid(campo: string) {
    return (
      this.formPassword.get(campo)?.invalid &&
      this.formPassword.get(campo)?.touched
    );
  }
  get dniErrorMsg(): string {
    const errors = this.miFormulario.get('dni')?.errors;
    if (errors?.required) {
      return 'El DNI es requerido';
    } else if (errors?.pattern) {
      return 'El valor ingresado no corresponde con formato DNI/NIE';
    }
    return '';
  }
  get passwordErrorMsg(): string {
    const errors = this.formPassword.get('password')?.errors;
    if (errors?.required) {
      return 'La contraseña es requerida';
    } else if (errors?.minlength) {
      return 'La contraseña debe tener mas de 6 caracteres';
    }
    return '';
  }

  get passwordErrorActual(): string {
    const errors = this.formPassword.get('passwordactual')?.errors;
    if (errors?.required) {
      return 'La contraseña es requerida';
    } else if (errors?.minlength) {
      return 'La contraseña debe tener mas de 6 caracteres';
    }
    return '';
  }

  get cuentaErrorMsg(): string {
    const errors = this.miFormulario.get('cuenta_bancaria')?.errors;
    if (errors?.required) {
      return 'El nº de cuenta es requerido';
    } else if (errors?.pattern) {
      return 'El valor ingresado no tiene formato de numero de cuenta';
    }
    return '';
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
  cambiarPassword() {
    this.cambiarPass = true;
  }

  confirmarPassword() {
    this.passwordPerfil = this.formPassword.value;
    this.passwordPerfil.email = this.usuario.email;
    this.adminService
      .actualizarPassPerfil(this.passwordPerfil)
      .subscribe((resp) => {
        if (resp != 'error') {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Contraseña correctamente actualizada',
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al intentar cambiar la contraseña!',
            text: 'La contraseña que ingresaste no coincide con nuestros registros. Por favor, revisala e inténtelo de nuevo.',
          });
        }
      });
  }
}
