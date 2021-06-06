import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { ValidatorService } from '../../../../auth/services/validator.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { Usuario } from '../../../../models/interface';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-editmonitor',
  templateUrl: './editmonitor.component.html',
  styleUrls: ['./editmonitor.component.css'],
})
export class EditmonitorComponent implements OnInit {
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
    private router: Router,
    private adminService: AdminService,
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private authService: AuthService,
    private sanitizer: DomSanitizer
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
      id_centro: ['', [Validators.required]],
      role: ['', [Validators.required]],
      email: [`${this.monitor.email}`],
      id_tarifa: [''],
      fecha_alta_: [],
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
        this.imagenGuardada = this.monitor.imagen!;
        this.nombreFichero = this.monitor.imagen!;
        //console.log(this.monitor);
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

  editar(): void {
    this.monitor = this.miFormulario.value;
    if (this.monitor.role == 2) {
      this.monitor.estado = 'activo';
      this.monitor.fecha_alta = this.fechaActual();
      this.monitor.num_reservas = 0;
    }
    this.monitor.estado = 'activo';
    if (this.monitor.role == 3) {
      this.monitor.id_tarifa = undefined;
    }

    this.monitor.imagen = this.nombreFichero;

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

    if (
      this.monitor.imagen != '' &&
      this.nombreFichero != this.imagenGuardada
    ) {
      this.uploadFile();
    }
    if (this.nombreFichero == this.imagenGuardada) {
      this.previsualizacion = '';
    }

    if (this.monitor.role == 2) {
      this.router.navigateByUrl('dashboard/admin/listamonitores');
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
    this.monitor.imagen = this.nombreFichero;
    this.adminService.uploadFile(this.file_data).subscribe((resp) => {
      this.activatedRoute.params
        .pipe(
          switchMap(({ email }) => this.adminService.getUsuarioPorEmail(email))
        )
        .subscribe((cliente) => {
          this.monitor = cliente;
          //console.log(this.monitor);
        });
      this.monitor.imagen = '';
    });
    this.monitor.imagen = '';
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
