import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario, Tarifa } from '../../interfaces/interface';
import { ValidatorService } from '../../services/validator.service';
import { EmailValidatorService } from '../../services/email-validator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
    `
      .mat-stepper-horizontal {
        margin-top: 8px;
      }

      .mat-form-field {
        margin-top: 18px;
      }
      
      mat-form-field{
    width: 100%;
}
    `,
  ],
})
export class RegistroComponent implements OnInit {
  cliente: Usuario = {};
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  minDate!: Date;
  maxDate!: Date;
  tarifas:any;
  centros:any;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidatorService: EmailValidatorService,
    private authService:AuthService,
    private router: Router
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 18,0,0);
    this.tarifas=[];
    this.centros=[];
  }


  ngOnInit() {

    this.authService.selectTarifas().subscribe(resp=>{
      this.tarifas=resp;
    })

    this.authService.selectCentros().subscribe(resp=>{
      this.centros=resp;
    })
    
    this.firstFormGroup = this.fb.group(
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
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
          [this.emailValidatorService],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required]],
      },
      {
        validators: [
          this.validatorService.camposIguales('password', 'password2'),
        ],
      }
    );
    this.secondFormGroup = this.fb.group({
      fecha_nac: ['', [Validators.required]],
      sexo: [''],
      telefono: ['', [Validators.required,Validators.pattern('^[6-7]{1}[0-9]{8}$')]],
      cuenta_bancaria: ['', [Validators.required,Validators.pattern('[a-zA-Z]{2}[0-9]{22}$')]],
      ciudad: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      cod_postal: ['', [Validators.required]],
    });
    
    this.thirdFormGroup = this.fb.group({
      id_tarifa: ['', [Validators.required]],
      id_centro: ['', [Validators.required]],
    });
  }

  registrar() {
    this.cliente = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value
    };
    this.authService.registro(this.cliente).subscribe((resp) => {
      if (resp != 'ERROR') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registro completado con exito, gracias por confiar en nosotros ' +resp.nombre?.toUpperCase() +'!' ,
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigateByUrl('auth/login');
      }
    });
  }

  campoNoValido(campo: string) {
    return (
      (this.firstFormGroup.get(campo)?.invalid &&
        this.firstFormGroup.get(campo)?.touched) ||
      (this.secondFormGroup.get(campo)?.invalid &&
        this.secondFormGroup.get(campo)?.touched)
        ||
      (this.thirdFormGroup.get(campo)?.invalid &&
        this.thirdFormGroup.get(campo)?.touched)
    );
  }

  get emailErrorMsg(): string {
    const errors = this.firstFormGroup.get('email')?.errors;
    if (errors?.required) {
      return 'El email es requerido';
    } else if (errors?.pattern) {
      return 'El valor ingresado no tiene formato de correo';
    } else if (errors?.emailTomado) {
      return 'El email ya está registrado';
    }
    return '';
  }

  get dniErrorMsg(): string {
    const errors = this.firstFormGroup.get('dni')?.errors;
    if (errors?.required) {
      return 'El DNI es requerido';
    } else if (errors?.pattern) {
      return 'El valor ingresado no corresponde con formato DNI/NIE';
    }
    return '';
  }

  get passwordErrorMsg(): string {
    const errors = this.firstFormGroup.get('password')?.errors;
    if (errors?.required) {
      return 'La contraseña es requerida';
    } else if (errors?.minlength) {
      return 'La contraseña debe tener mas de 6 caracteres';
    }
    return '';
  }

  get telefonoErrorMsg(): string {
    const errors = this.secondFormGroup.get('telefono')?.errors;
    if (errors?.required) {
      return 'El nº de telefono es requerido';
    } else if (errors?.pattern) {
      return 'El valor ingresado no tiene formato de numero de telefono';
    }
    return '';
  }

  get cuentaErrorMsg(): string {
    const errors = this.secondFormGroup.get('cuenta_bancaria')?.errors;
    if (errors?.required) {
      return 'El nº de cuenta es requerido';
    } else if (errors?.pattern) {
      return 'El valor ingresado no tiene formato de numero de cuenta';
    }
    return '';
  }

  elegirTarifa(id:number){
    this.thirdFormGroup.controls['id_tarifa'].setValue(id);
  }
  
}
