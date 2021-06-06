import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario, Tarifa } from '../../../models/interface';
import { ValidatorService } from '../../services/validator.service';
import { EmailValidatorService } from '../../services/email-validator.service';
import Swal from 'sweetalert2';
import { AdminService } from '../../../protected/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ActividadesPorTarifaComponent } from '../actividades-por-tarifa/actividades-por-tarifa.component';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { TranslateService } from '@ngx-translate/core';

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

      mat-form-field {
        width: 100%;
      }
    `,
  ],
})
export class RegistroComponent implements OnInit {
  showPaypalButtons: boolean = false;
  cliente: Usuario = {};
  hide = true;
  oculto = true;
  actividades!: any;
  listaActividades: boolean = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  minDate!: Date;
  maxDate!: Date;
  tarifas: any;
  centros: any;
  tarifa!: Tarifa;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidatorService: EmailValidatorService,
    private authService: AuthService,
    private router: Router,
    private adminService: AdminService,
    private translateService: TranslateService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 18, 0, 0);
    this.tarifas = [];
    this.centros = [];
  }

  ngOnInit() {
    this.authService.selectTarifas().subscribe((resp) => {
      this.tarifas = resp;
    });

    this.authService.selectCentros().subscribe((resp) => {
      this.centros = resp;
    });

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
      ...this.thirdFormGroup.value,
    };
    this.authService.registro(this.cliente).subscribe((resp) => {
      console.log(this.cliente);
      console.log(resp);
      if (resp != 'ERROR') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `
            ${this.translateService.instant('Bienvenido')} 
            ${this.cliente.nombre?.toLocaleUpperCase()}. ${this.translateService.instant(
            'Se ha enviado un correo de verificacion a'
          )} ${this.cliente.email} !`,
          showConfirmButton: false,
          timer: 4000,
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
        this.secondFormGroup.get(campo)?.touched) ||
      (this.thirdFormGroup.get(campo)?.invalid &&
        this.thirdFormGroup.get(campo)?.touched)
    );
  }

  get emailErrorMsg(): string {
    const errors = this.firstFormGroup.get('email')?.errors;
    if (errors?.required) {
      return this.translateService.instant('El email es obligatorio');
    } else if (errors?.pattern) {
      return this.translateService.instant(
        'El valor ingresado no tiene formato de correo'
      );
    } else if (errors?.emailTomado) {
      return this.translateService.instant('El email ya está registrado');
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

  get passwordErrorMsg(): string {
    const errors = this.firstFormGroup.get('password')?.errors;
    if (errors?.required) {
      return this.translateService.instant('La contraseña es requerida');
    } else if (errors?.minlength) {
      return this.translateService.instant('La contraseña debe tener mas de 6 caracteres');
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

  esMenor() {
    const today: Date = new Date();
    const birthDate: Date = new Date(
      this.secondFormGroup.get('fecha_nac')?.value
    );
    let age: number = today.getFullYear() - birthDate.getFullYear();
    const month: number = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      this.secondFormGroup.get('fecha_nac')?.setErrors({ noIguales: true });
      return true;
    } else {
      return '';
    }
  }
  elegirTarifa(id: number): void {
    this.thirdFormGroup.controls['id_tarifa'].setValue(id);
  }

  verActividades(tarifa: Tarifa) {
    const dialogRef = this.dialog.open(ActividadesPorTarifaComponent, {
      width: '550px',
      data: { id: tarifa.id, nombre: tarifa.nombre },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  public payPalConfig?: IPayPalConfig;

  private initConfig(): void {
    console.log(this.tarifa);
    this.payPalConfig = {
      currency: 'EUR',
      clientId:
        'AQAwkSv02HKvahX2b6dCbOOfjL4N4knsgbZd5-Gb1JbTctNk4MuZEyAS8fMY-xFtrl2OAjzetUMgodcd',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: this.tarifa.precio?.toString(),
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: this.tarifa.precio?.toString(),
                  },
                },
              },
              items: [
                {
                  name: 'Tarifa ' + this.tarifa.nombre?.toUpperCase(),
                  quantity: '1',
                  unit_amount: {
                    currency_code: 'EUR',
                    value: this.tarifa.precio?.toString(),
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },

      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        // actions.order.get().then(details => {
        //     console.log('onApprove - you can get full order details inside onApprove: ', details);
        // });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.registrar();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  pay() {
    this.showPaypalButtons = true;
    this.cliente = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
    };
    this.adminService
      .getTarifaPorId(this.cliente.id_tarifa!)
      .subscribe((tarifa) => {
        this.tarifa = tarifa;
      });

    this.initConfig();
    console.log(this.tarifa);
  }

  back() {
    this.showPaypalButtons = false;
  }
}
