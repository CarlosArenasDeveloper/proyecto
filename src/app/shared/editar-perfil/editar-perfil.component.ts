import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { switchMap, timeInterval } from 'rxjs/operators';
import { AdminService } from '../../protected/services/admin.service';
import { ValidatorService } from '../../auth/services/validator.service';
import { AuthService } from '../../auth/services/auth.service';
import { Usuario, PasswordPerfil } from '../../models/interface';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css'],
})
export class EditarPerfilComponent implements OnInit {
  previsualizacion!: string;
  mostrarImagen: boolean = false;
  public archivos: any = [];
  file = new FormControl('');
  archivo = {
    nombre: '',
    nombreArchivo: '',
    base64textString: '',
  };
  file_data: any = '';
  nombreFichero: string = '';
  imagenGuardada: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private translateService: TranslateService
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
  tarifa!: any;
  reservas!: any;
  estado!: any;
  usuario: Usuario = {};
  user: any;

  fechaActual(): string {
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) {
      if (month < 10) {
        return `${year}-0${month}-0${day}`;
      } else {
        return `${year}-${month}-0${day}`;
      }
    } else {
      if (month < 10) {
        //console.log(`${year}-0${month}-${day}`);
        return `${year}-0${month}-${day}`;
      } else {
        //console.log(`${year}-${month}-${day}`);
        return `${year}-${month}-${day}`;
      }
    }
  }

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
    fecha_alta: [''],
    fecha_baja: [''],
  });

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
      .subscribe((usuario) => {
        this.usuario = usuario;
        this.user = usuario;
        this.imagenGuardada = this.usuario.imagen!;
        this.nombreFichero = this.usuario.imagen!;
        if (this.usuario.role == 1) {
          this.role = 1;
        } else if (this.usuario.role == 3) {
          this.adminService
            .getCentroPorId(this.usuario.id_centro!)
            .subscribe((centro) => {
              this.centro = centro.nombre;
            });
          this.role = 3;
        } else if (this.usuario.role == 2) {
          this.adminService
            .getCentroPorId(this.usuario.id_centro!)
            .subscribe((centro) => {
              this.centro = centro.nombre;
            });

          this.adminService
            .getTarifaPorId(this.usuario.id_tarifa!)
            .subscribe((tarifa) => {
              this.tarifa = tarifa.nombre;
            });
          this.role = 2;
          this.reservas = this.usuario.num_reservas;
          this.estado = this.usuario.estado;
          this.miFormulario.controls['fecha_alta'].setValue(
            this.usuario.fecha_alta
          );
          this.miFormulario.controls['fecha_baja'].setValue(
            this.usuario.fecha_baja
          );
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
    this.usuario.imagen = this.nombreFichero;

    this.adminService.editarAdmin(this.usuario).subscribe((resp) => {
      if (resp) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${this.translateService.instant(
            `${this.translateService.instant('Datos correctamente actualizados')}`
          )}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
    if (
      this.usuario.imagen != '' &&
      this.nombreFichero != this.imagenGuardada
    ) {
      this.uploadFile();
    }
    if (this.nombreFichero == this.imagenGuardada) {
      this.previsualizacion = '';
    }
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
      return this.translateService.instant('El DNI es requerido');
    } else if (errors?.pattern) {
      return this.translateService.instant(
        'El valor ingresado no corresponde con formato DNI/NIE'
      );
    }
    return '';
  }

  get passwordErrorActual(): string {
    const errors = this.formPassword.get('passwordactual')?.errors;
    if (errors?.required) {
      return this.translateService.instant('La contraseña es requerida');
    } else if (errors?.minlength) {
      return this.translateService.instant(
        'La contraseña debe tener mas de 6 caracteres'
      );
    }
    return '';
  }

  get passwordErrorMsg(): string {
    const errors = this.miFormulario.get('password')?.errors;
    if (errors?.required) {
      return this.translateService.instant('La contraseña es requerida');
    } else if (errors?.minlength) {
      return this.translateService.instant(
        'La contraseña debe tener mas de 6 caracteres'
      );
    }
    return '';
  }

  get telefonoErrorMsg(): string {
    const errors = this.miFormulario.get('telefono')?.errors;
    if (errors?.required) {
      return this.translateService.instant('El nº de telefono es requerido');
    } else if (errors?.pattern) {
      return this.translateService.instant(
        'El valor ingresado no tiene formato de numero de telefono'
      );
    }
    return '';
  }

  get cuentaErrorMsg(): string {
    const errors = this.miFormulario.get('cuenta_bancaria')?.errors;
    if (errors?.required) {
      return this.translateService.instant('El nº de cuenta es requerido');
    } else if (errors?.pattern) {
      return this.translateService.instant(
        'El valor ingresado no tiene formato de numero de cuenta'
      );
    }
    return '';
  }
  cambiarPassword() {
    this.cambiarPass = true;
  }

  esMenor() {
    const today: Date = new Date();
    const birthDate: Date = new Date(this.miFormulario.get('fecha_nac')?.value);
    let age: number = today.getFullYear() - birthDate.getFullYear();
    const month: number = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      this.miFormulario.get('fecha_nac')?.setErrors({ noIguales: true });
      return true;
    } else {
      return '';
    }
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
            title: `${this.translateService.instant(
              'Contraseña correctamente actualizada'
            )}`,
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: `${this.translateService.instant(
              'Error al intentar cambiar la contraseña'
            )}!`,
            text: `${this.translateService.instant(
              'La contraseña que ingresaste no coincide con nuestros registros. Por favor, revisala e inténtelo de nuevo'
            )}.`,
          });
        }
      });
  }
  darAlta() {
    Swal.fire({
      title: `¿${this.translateService.instant(
        'Estas seguro de que quieres darte de alta'
      )}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${this.translateService.instant('Si, dar de alta')}`,
      cancelButtonText: `${this.translateService.instant('No, cancelar')}`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.miFormulario.controls['fecha_alta'].setValue(this.fechaActual());
        this.usuario = this.miFormulario.value;
        this.usuario.estado = 'activo';
        this.adminService.darAlta(this.usuario).subscribe((resp) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${this.translateService.instant(
              'Alta completada con exito'
            )}`,
            text: `${this.translateService.instant(
              'Te esperamos en nuestro centro'
            )}!`,
            showConfirmButton: false,
            timer: 1500,
          });
          this.user.estado = 'activo';
        });
      }
    });
  }

  darBaja() {
    Swal.fire({
      title: `¿${this.translateService.instant(
        'Estas seguro de que quieres darte de baja'
      )}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${this.translateService.instant(
        'Si, darme de baja'
      )}`,
      cancelButtonText: `${this.translateService.instant('No, cancelar')}`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.miFormulario.controls['fecha_baja'].setValue(this.fechaActual());
        this.usuario = this.miFormulario.value;
        this.usuario.estado = 'baja';
        this.usuario.num_reservas = 0;
        this.adminService.darBaja(this.usuario).subscribe((resp) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${this.translateService.instant(
              'Baja completada con exito'
            )}!`,
            text: `${this.translateService.instant(
              'Esperamos volver a verte pronto'
            )}.`,
            showConfirmButton: false,
            timer: 1500,
          });
          this.user.estado = 'baja';
        });
      }
    });
  }

  fileChange(event: any) {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
    });
    this.archivos.push(archivoCapturado);

    const fileList: FileList = event.target.files;
    //check whether file is selected or not
    if (fileList.length > 0) {
      const file = fileList[0];
      //get file information such as name, size and type
      //max file size is 4 mb
      this.nombreFichero = file.name;
      if (file.size / 1048576 <= 4) {
        let formData = new FormData();
        let info = { id: 2, name: 'raja' };
        formData.append('file', file, file.name);
        formData.append('id', '2');
        formData.append('tz', new Date().toISOString());
        formData.append('update', '2');
        formData.append('info', JSON.stringify(info));
        this.file_data = formData;
       // console.log(this.file_data);
      } else {
        //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
      }
    }
  }

  uploadFile() {
    this.previsualizacion = '';
    this.mostrarImagen = true;
    this.usuario.imagen = this.nombreFichero;
    this.adminService.uploadFile(this.file_data).subscribe((resp) => {
      this.activatedRoute.params
        .pipe(
          switchMap(({ email }) => this.adminService.getUsuarioPorEmail(email))
        )
        .subscribe((cliente) => {
          this.usuario = cliente;
          //console.log(this.usuario);
        });
      this.usuario.imagen = '';
    });
    this.usuario.imagen = '';
  }

  capturarFile(event: any): any {
    // this.previsualizacion2 = '';
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      // this.previsualizacion2 = imagen.base;
    });
    this.archivos.push(archivoCapturado);
  }

  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };

        return '';
      } catch (e) {
        return null;
      }
    });
}
