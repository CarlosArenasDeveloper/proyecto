import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../auth/interfaces/interface';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../auth/services/validator.service';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editcliente',
  templateUrl: './editcliente.component.html',
  styleUrls: ['./editcliente.component.css'],
})
export class EditclienteComponent implements OnInit {
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
    this.tarifas = [];
    this.centros = [];
  }
  minDate!: Date;
  maxDate!: Date;
  tarifas: any;
  centros: any;
  cliente: Usuario = {};

  fechaActual():string {
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10) {
      return (`${year}-0${month}-${day}`);
    } else {
      return(`${year}-${month}-${day}`);
    }
  }

  miFormulario: FormGroup = this.fb.group(
    {
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
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', []],
      fecha_nac: ['', [Validators.required]],
      sexo: [''],
      telefono: ['', [Validators.required,Validators.pattern('^[6-7]{1}[0-9]{8}$')]],
      cuenta_bancaria: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z]{2}[0-9]{22}$')],
      ],
      ciudad: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      cod_postal: ['', [Validators.required]],
      id_tarifa: ['', [Validators.required]],
      id_centro: ['', [Validators.required]],
      fecha_alta: [''],
      num_reservas: [''],
      fecha_baja: [''],
      role: ['', [Validators.required]],
      estado: [''],
      email: [`${this.cliente.email}`],
    },
    {
      validators: [
        this.validatorService.camposIguales('password', 'password2'),
      ],
    }
  );

  ngOnInit(): void {
    this.authService.selectTarifas().subscribe((resp) => {
      this.tarifas = resp;
    });

    this.authService.selectCentros().subscribe((resp) => {
      this.centros = resp;
    });

    this.activatedRoute.params
      .pipe(
        switchMap(({ email }) => this.adminService.getUsuarioPorEmail(email))
      )
      .subscribe((cliente) => {
        this.cliente = cliente;
        this.miFormulario.controls['fecha_alta'].setValue(
          this.cliente.fecha_alta
        );
        this.miFormulario.controls['dni'].setValue(this.cliente.dni);
        this.miFormulario.controls['password'].setValue(this.cliente.password);
        this.miFormulario.controls['password2'].setValue(this.cliente.password);

        this.miFormulario.controls['nombre'].setValue(this.cliente.nombre);
        this.miFormulario.controls['apellido1'].setValue(
          this.cliente.apellido1
        );
        this.miFormulario.controls['apellido2'].setValue(
          this.cliente.apellido2
        );
        this.miFormulario.controls['fecha_nac'].setValue(
          this.cliente.fecha_nac
        );
        this.miFormulario.controls['sexo'].setValue(this.cliente.sexo);
        this.miFormulario.controls['telefono'].setValue(this.cliente.telefono);
        this.miFormulario.controls['cuenta_bancaria'].setValue(
          this.cliente.cuenta_bancaria
        );
        this.miFormulario.controls['ciudad'].setValue(this.cliente.ciudad);
        this.miFormulario.controls['id_tarifa'].setValue(
          this.cliente.id_tarifa
        );
        this.miFormulario.controls['id_centro'].setValue(
          this.cliente.id_centro
        );
        this.miFormulario.controls['direccion'].setValue(
          this.cliente.direccion
        );
        this.miFormulario.controls['cod_postal'].setValue(
          this.cliente.cod_postal
        );
        this.miFormulario.controls['num_reservas'].setValue(
          this.cliente.num_reservas
        );

        this.miFormulario.controls['estado'].setValue(this.cliente.estado);
        this.miFormulario.controls['fecha_baja'].setValue(
          this.cliente.fecha_baja
        );
        this.miFormulario.controls['email'].setValue(this.cliente.email);
        this.miFormulario.controls['role'].setValue(this.cliente.role);
      });
  }

  editar():void {
    this.cliente = this.miFormulario.value;
    this.adminService.editarCliente(this.cliente).subscribe((resp) => {
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
    const errors = this.miFormulario.get('password')?.errors;
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

  baja() {
    Swal.fire({
      title: `¿Estas seguro de que quieres dar de baja a ${this.cliente.nombre?.toUpperCase()} ${this.cliente.apellido1?.toUpperCase()}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, dar de baja',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cliente.estado = 'baja';
        this.miFormulario.controls['estado'].setValue('baja');
        this.miFormulario.controls['fecha_baja'].setValue(this.fechaActual());
        this.miFormulario.controls['num_reservas'].setValue(0);
        this.cliente = this.miFormulario.value;
        this.adminService.darBaja(this.cliente).subscribe((resp) => {
          Swal.fire(
            'Baja completada!',
            `Se ha dado de baja a ${this.cliente.nombre?.toUpperCase()} ${this.cliente.apellido1?.toUpperCase()}`,
            'success'
          );
        });
      }
    });
  }

  alta() {
    Swal.fire({
      title: `¿Estas seguro de que quieres dar de alta a ${this.cliente.nombre?.toUpperCase()} ${this.cliente.apellido1?.toUpperCase()}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, dar de alta',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cliente.estado = 'activo';
        this.miFormulario.controls['estado'].setValue('activo');
         this.miFormulario.controls['fecha_alta'].setValue(this.fechaActual());
        this.cliente = this.miFormulario.value;
        console.log(this.cliente);
        this.adminService.darAlta(this.cliente).subscribe((resp) => {
          Swal.fire(
            'Alta completada!',
            `Se ha dado de alta a ${this.cliente.nombre?.toUpperCase()} ${this.cliente.apellido1?.toUpperCase()}`,
            'success'
          );
        });
      }
    });
  }


}
