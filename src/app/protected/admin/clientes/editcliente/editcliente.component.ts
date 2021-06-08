import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../../models/interface';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../../auth/services/validator.service';
import { AuthService } from '../../../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-editcliente',
  templateUrl: './editcliente.component.html',
  styleUrls: ['./editcliente.component.css'],
})
export class EditclienteComponent implements OnInit {

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
  imagenGuardada:string='';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private translateService:TranslateService

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
      id_tarifa: ['', [Validators.required]],
      id_centro: ['', [Validators.required]],
      fecha_alta: [''],
      num_reservas: [''],
      fecha_baja: [''],
      role: ['', [Validators.required]],
      estado: [''],
      email: [`${this.cliente.email}`],
      verificado: [],
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
        this.imagenGuardada=this.cliente.imagen!
        this.nombreFichero=this.cliente.imagen!
        //console.log(this.cliente);
        if (this.cliente.verificado == 1) {
          this.miFormulario.controls['verificado'].setValue(true);
        } else {
          this.miFormulario.controls['verificado'].setValue(false);
        }
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

  editar(): void {
    this.cliente = this.miFormulario.value;
    const verificado = this.cliente.verificado;
    if (verificado) {
      this.cliente.verificado = 1;
    } else {
      this.cliente.verificado = 0;
    }
    if (this.cliente.estado === 'baja') {
      Swal.fire({
        icon: 'error',
        title: `${this.translateService.instant('Los datos no fueron actualizados')}...`,
        text:
          `${this.translateService.instant('Para cambiar la informacion de un cliente, este debe de estar dado de alta')}!`,
      });
      return;
    }
    if (this.cliente.role == 3) {
      this.cliente.id_tarifa=undefined;
      this.cliente.fecha_alta=undefined;
      this.cliente.fecha_baja=undefined;
      this.cliente.num_reservas=0;
    }
    this.cliente.imagen = this.nombreFichero;
    
    this.adminService.editarCliente(this.cliente).subscribe((resp) => {
      if (resp) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${this.translateService.instant('Datos correctamente actualizados')}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
    if (this.cliente.imagen != '' && this.nombreFichero!=this.imagenGuardada) {
      this.uploadFile();
    }
    if (this.nombreFichero == this.imagenGuardada) {
      this.previsualizacion = '';
    }

    if (this.cliente.role == 3) {
      this.router.navigateByUrl('dashboard/admin/listaclientes');
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
      return this.translateService.instant('El DNI es requerido');
    } else if (errors?.pattern) {
      return this.translateService.instant(
        'El valor ingresado no corresponde con formato DNI/NIE'
      );
    }
    return '';
  }
  get passwordErrorMsg(): string {
    const errors = this.miFormulario.get('password')?.errors;
    if (errors?.required) {
      return this.translateService.instant('La contraseña es requerida');
    } else if (errors?.minlength) {
      return this.translateService.instant('La contraseña debe tener mas de 6 caracteres');
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

  esMenor() {
    const today: Date = new Date();
    const birthDate: Date = new Date(this.miFormulario.get('fecha_nac')?.value);
    let age: number = today.getFullYear() - birthDate.getFullYear();
    const month: number = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if(age < 18){
      this.miFormulario.get('fecha_nac')?.setErrors({ noIguales: true });
      return true;
    } else{
      return "";
    }
}

  cambiarEstado() {
    Swal.fire({
      title: `${this.translateService.instant('Cambiar estado a')} ${this.cliente.nombre?.toUpperCase()}`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `${this.translateService.instant('alta')}`,
      denyButtonText: `${this.translateService.instant('baja')}`,
      cancelButtonText: `${this.translateService.instant('bloquear')}`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${this.translateService.instant('¿Estas seguro de que quieres dar de alta a')} ${this.cliente.nombre?.toUpperCase()} ${this.cliente.apellido1?.toUpperCase()}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: `${this.translateService.instant('Si')}`,
          cancelButtonText: `${this.translateService.instant('No, cancelar')}`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.cliente.estado = 'activo';
            this.miFormulario.controls['estado'].setValue('activo');
            this.miFormulario.controls['fecha_alta'].setValue(
              this.fechaActual()
            );
            this.cliente = this.miFormulario.value;
            this.adminService.darAlta(this.cliente).subscribe((resp) => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${this.translateService.instant('Se ha dado de alta a')}  ${this.cliente.nombre?.toUpperCase()}`,
                showConfirmButton: false,
                timer: 1500,
              });
            });
          }
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: `${this.translateService.instant('¿Estas seguro de que quieres dar de baja a')} ${this.cliente.nombre?.toUpperCase()} ${this.cliente.apellido1?.toUpperCase()}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: `${this.translateService.instant('Si')}`,
          cancelButtonText: `${this.translateService.instant('No, cancelar')}`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.cliente.estado = 'baja';
            this.miFormulario.controls['estado'].setValue('baja');
            this.miFormulario.controls['fecha_baja'].setValue(
              this.fechaActual()
            );
            this.miFormulario.controls['num_reservas'].setValue(0);
            this.cliente = this.miFormulario.value;
            this.adminService.darBaja(this.cliente).subscribe((resp) => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${this.translateService.instant('Se ha dado de baja a')} ${this.cliente.nombre?.toUpperCase()}`,
                showConfirmButton: false,
                timer: 1500,
              });
            });
          }
        });
      } else {
        Swal.fire({
          title: `${this.translateService.instant('¿Estas seguro de que quieres bloquear a')} ${this.cliente.nombre?.toUpperCase()} ${this.cliente.apellido1?.toUpperCase()}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: `${this.translateService.instant('Si')}`,
          cancelButtonText: `${this.translateService.instant('No, cancelar')}`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.cliente.estado = 'bloqueado';
            this.miFormulario.controls['estado'].setValue('bloqueado');
            this.miFormulario.controls['fecha_baja'].setValue(
              this.fechaActual()
            );
            this.cliente = this.miFormulario.value;
            this.adminService.darBaja(this.cliente).subscribe((resp) => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Se ha bloqueado a ' ${this.cliente.nombre?.toUpperCase()}`,
                showConfirmButton: false,
                timer: 1500,
              });
            });
          }
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
        //console.log(this.file_data);
      } else {
        //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
      }
    }
  }
  
  uploadFile() {
    this.previsualizacion = '';
    this.mostrarImagen = true;
    this.cliente.imagen=this.nombreFichero;
    this.adminService.uploadFile(this.file_data).subscribe((resp) => {
      this.activatedRoute.params
        .pipe(switchMap(({ email }) => this.adminService.getUsuarioPorEmail(email)))
        .subscribe((cliente) => {
        this.cliente = cliente;
        //console.log(this.cliente);
        });
      this.cliente.imagen = '';
    });
    this.cliente.imagen = '';
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
