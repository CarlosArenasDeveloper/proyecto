import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { ValidatorService } from '../../../../auth/services/validator.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { Usuario } from '../../../../auth/interfaces/interface';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-editmonitor',
  templateUrl: './editmonitor.component.html',
  styleUrls: ['./editmonitor.component.css']
})
export class EditmonitorComponent implements OnInit {

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

  monitor: Usuario = {};


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
      id_centro: ['', [Validators.required]],
      role: ['', [Validators.required]],
      email: [`${this.monitor.email}`],
      id_tarifa:[''],
      fecha_alta_:[]
    },
    {
      validators: [
        this.validatorService.camposIguales('password', 'password2'),
      ],
    }
  );

  ngOnInit(): void {

    this.authService.selectCentros().subscribe((resp) => {
      this.centros = resp;
    });

    this.authService.selectTarifas().subscribe((resp) => {
      this.tarifas = resp;
    });

    this.activatedRoute.params
      .pipe(
        switchMap(({ email }) => this.adminService.getUsuarioPorEmail(email))
      )
      .subscribe((monitor) => {
        this.monitor = monitor;
        this.miFormulario.controls['dni'].setValue(this.monitor.dni);
        this.miFormulario.controls['password'].setValue(this.monitor.password);
        this.miFormulario.controls['password2'].setValue(this.monitor.password);
        this.miFormulario.controls['nombre'].setValue(this.monitor.nombre);
        this.miFormulario.controls['apellido1'].setValue(
          this.monitor.apellido1
        );
        this.miFormulario.controls['apellido2'].setValue(
          this.monitor.apellido2
        );
        this.miFormulario.controls['fecha_nac'].setValue(
          this.monitor.fecha_nac
        );
        this.miFormulario.controls['sexo'].setValue(this.monitor.sexo);
        this.miFormulario.controls['telefono'].setValue(this.monitor.telefono);
        this.miFormulario.controls['cuenta_bancaria'].setValue(
          this.monitor.cuenta_bancaria
        );
        this.miFormulario.controls['ciudad'].setValue(this.monitor.ciudad);
        this.miFormulario.controls['id_centro'].setValue(
          this.monitor.id_centro
        );
        this.miFormulario.controls['direccion'].setValue(
          this.monitor.direccion
        );
        this.miFormulario.controls['cod_postal'].setValue(
          this.monitor.cod_postal
        );
        this.miFormulario.controls['email'].setValue(this.monitor.email);
        this.miFormulario.controls['role'].setValue(this.monitor.role);
      });
  }

  editar():void {
    this.monitor = this.miFormulario.value;
    if(this.monitor.role==2){
      this.monitor.estado="activo"
      this.monitor.fecha_alta=new Date();
      this.monitor.num_reservas=0;
    }
       this.monitor.estado="activo"
       if(this.monitor.role==3){
         this.monitor.id_tarifa=undefined;
       }

    console.log(this.miFormulario.value);

    console.log(this.monitor);

    this.adminService.editarMonitor(this.monitor).subscribe((resp) => {
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

    if(this.monitor.role==2){
      this.router.navigateByUrl('dashboard/admin/listamonitores')
    }
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



}
