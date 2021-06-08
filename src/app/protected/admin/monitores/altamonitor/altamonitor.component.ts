import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ValidatorService } from 'src/app/auth/services/validator.service';
import { Usuario } from '../../../../models/interface';
import { EmailValidatorService } from '../../../../auth/services/email-validator.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../../../services/admin.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-altamonitor',
  templateUrl: './altamonitor.component.html',
  styleUrls: ['./altamonitor.component.css']
})
export class AltamonitorComponent implements OnInit {

  monitor: Usuario = {};
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  minDate!: Date;
  maxDate!: Date;
  centros:any;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidatorService: EmailValidatorService,
    private authService:AuthService,
    private adminService :AdminService,
    private router: Router,
    private translateService: TranslateService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 18,0,0);
    this.centros=[];
  }


  ngOnInit() {
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
      id_centro: ['', [Validators.required]],
    });
  }

  campoNoValido(campo: string) {
    return (
      (this.firstFormGroup.get(campo)?.invalid &&
        this.firstFormGroup.get(campo)?.touched) ||
      (this.secondFormGroup.get(campo)?.invalid &&
        this.secondFormGroup.get(campo)?.touched)
    );
  }

  get emailErrorMsg(): string {
    const errors = this.firstFormGroup.get('email')?.errors;
    if (errors?.required) {
      return this.translateService.instant('El email es obligatorio');
    } else if (errors?.pattern) {
      return  this.translateService.instant('El valor ingresado no tiene formato de correo');
    }
    return '';
  }


  get passwordErrorMsg(): string {
    const errors = this.firstFormGroup.get('password')?.errors;
    if (errors?.required) {
      return this.translateService.instant('La contraseña es requerida');
    } else if (errors?.minlength) {
      return this.translateService.instant('La contraseña debe tener mas de 6 caracteres');
    }
    return '';
  }



  get dniErrorMsg(): string {
    const errors = this.firstFormGroup.get('dni')?.errors;
    if (errors?.required) {
      return this.translateService.instant('El DNI es requerido');
    } else if (errors?.pattern) {
      return this.translateService.instant(
        'El valor ingresado no corresponde con formato DNI/NIE'
      );
    }
    return '';
  }



  get telefonoErrorMsg(): string {
    const errors = this.secondFormGroup.get('telefono')?.errors;
    if (errors?.required) {
      return this.translateService.instant('El nº de telefono es requerido');
    } else if (errors?.pattern) {
      return this.translateService.instant('El valor ingresado no tiene formato de numero de telefono');
    }
    return '';
  }

  get cuentaErrorMsg(): string {
    const errors = this.secondFormGroup.get('cuenta_bancaria')?.errors;
    if (errors?.required) {
      return this.translateService.instant('El nº de cuenta es requerido');
    } else if (errors?.pattern) {
      return this.translateService.instant('El valor ingresado no tiene formato de numero de cuenta');
    }
    return '';
  }
  
  add() {
    this.monitor = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
    };
    this.adminService.addMonitor(this.monitor).subscribe((resp) => {
      if (resp != 'ERROR') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title:  `${this.translateService.instant('Se ha añadido con exito a')} ${this.monitor.nombre!.toUpperCase()} !` ,
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigateByUrl('dashboard/admin/listamonitores');
      }
    });
  }

  esMenor() {
    const today: Date = new Date();
    const birthDate: Date = new Date(this.secondFormGroup.get('fecha_nac')?.value);
    let age: number = today.getFullYear() - birthDate.getFullYear();
    const month: number = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if(age < 18){
      this.secondFormGroup.get('fecha_nac')?.setErrors({ noIguales: true });
      return true;
    } else{
      return "";
    }
}
}
