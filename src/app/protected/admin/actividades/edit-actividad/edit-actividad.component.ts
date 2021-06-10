import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Actividad, Usuario } from '../../../../models/interface';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-actividad',
  templateUrl: './edit-actividad.component.html',
  styleUrls: ['./edit-actividad.component.css'],
})
export class EditActividadComponent implements OnInit {
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

  emailMonitor!: string;

  usuario!: Usuario;
  id!: number;
  monitores: any;
  colores:any;
  actividad: Actividad = {};
  tarifas: any;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private translateService:TranslateService
  ) {}

  ngOnInit(): void {
    const usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    this.usuario = usuario;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.adminService.getActividadPorId(id)))
      .subscribe((actividad) => {
        //console.log(actividad);
        this.actividad = actividad;
        //  this.emailMonitor!=this.actividad.email_monitor;
        this.imagenGuardada = this.actividad.imagen!;
        this.nombreFichero = this.actividad.imagen!;

        this.id = actividad.id!;
        this.miFormulario.controls['nombre'].setValue(this.actividad.nombre);
        this.miFormulario.controls['email_monitor'].setValue(
          this.actividad.email_monitor
        );
        this.miFormulario.controls['id_tarifa'].setValue(
          this.actividad.id_tarifa
        );
        this.miFormulario.controls['descripcion'].setValue(
          this.actividad.descripcion
        );
        this.miFormulario.controls['color'].setValue(this.actividad.color);

        if(this.actividad.email_monitor!=null){
          this.adminService
          .getMonitoresDisponiblesEdit(this.actividad.email_monitor!)
          .subscribe((monitor) => {
            this.monitores = monitor;
          });
        }else{
          this.adminService
          .getMonitoresDisponibles()
          .subscribe((monitor) => {
            this.monitores = monitor;
          });
        }

        if(this.actividad.color!=null){
          console.log(this.actividad.color);
          this.adminService.selectColoresLibresEdit(this.actividad.color).subscribe((colores)=>{
            this.colores=colores;
            console.log(colores);
          })
        }else{
          this.adminService.selectColoresLibres().subscribe((colores)=>{
            this.colores=colores;
          })
        }
       
      });

    this.adminService.getTarifas().subscribe((tarifa) => {
      this.tarifas = tarifa;
    });

  }

  isAdmin() {
    if (this.usuario.role == 1) {
      return true;
    }
    return false;
  }

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    email_monitor: ['', [Validators.required]],
    id_tarifa: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    color: [''],
  });

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  editarActividad() {
    if (
      this.miFormulario.get('email_monitor')?.value == 'null' ||
      this.miFormulario.get('id_tarifa')?.value == 'null'
    ) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title:  `${this.translateService.instant('Datos incompletos')}`,
        text:`${this.translateService.instant('Por favor, rellene todos los campos requeridos')}`,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    this.actividad = this.miFormulario.value;
    this.actividad.id = this.id;
    this.actividad.imagen = this.nombreFichero;
    // this.actividad.email_monitor=this.emailMonitor;
    this.adminService.editarActividad(this.actividad).subscribe((resp) => {
      if (resp == null) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${this.translateService.instant('Datos correctamente actualizados')}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
    if (
      this.actividad.imagen != '' &&
      this.nombreFichero != this.imagenGuardada
    ) {
      this.uploadFile();
    }
    if (this.nombreFichero == this.imagenGuardada) {
      this.previsualizacion = '';
    }
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
        //(this.file_data);
      } else {
        //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
      }
    }
  }

  uploadFile() {
    this.previsualizacion = '';
    this.mostrarImagen = true;
    this.actividad.imagen = this.nombreFichero;
    this.adminService.uploadFile(this.file_data).subscribe((resp) => {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.adminService.getActividadPorId(id)))
        .subscribe((actividad) => {
          this.actividad = actividad;
        });
      this.actividad.imagen = '';
    });
    this.actividad.imagen = '';
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

  cambiarMonitor() {
    this.actividad.id = this.id;
    this.adminService.cambiarMonitor(this.actividad).subscribe((resp) => {
      if (resp == null) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El monitor seleccionado ha sido dado de baja de la actividad',
          showConfirmButton: false,
          timer: 2000,
        });
        this.miFormulario.controls['email_monitor'].setValue(null);
      }
    });
  }
}
