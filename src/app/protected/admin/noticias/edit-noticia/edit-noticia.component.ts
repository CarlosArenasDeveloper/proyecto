import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { Noticia } from '../../../../models/interface';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-noticia',
  templateUrl: './edit-noticia.component.html',
  styleUrls: ['./edit-noticia.component.css'],
})
export class EditNoticiaComponent implements OnInit {
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

  categorias: any;
  editores: any;
  noticia: Noticia = {};
  id!: number;
  esVisible: any;
  estabaVisible: any;
  fechaLanzamiento: any;

  

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.adminService.getCategorias().subscribe((categoria) => {
      this.categorias = categoria;
    });

    this.adminService.getEditores().subscribe((editor) => {
      this.editores = editor;
    });

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.adminService.getNoticiaPorId(id)))
      .subscribe((noticia) => {
        this.fechaLanzamiento = noticia.fecha;
        this.estabaVisible = noticia.visible;

        this.noticia = noticia;
        this.imagenGuardada=this.noticia.imagen!
        this.nombreFichero=this.noticia.imagen!
        this.id = noticia.id!;
        this.miFormulario.controls['titulo'].setValue(this.noticia.titulo);
        this.miFormulario.controls['email_usuario'].setValue(
          this.noticia.email_usuario
        );
        this.miFormulario.controls['cuerpo'].setValue(this.noticia.cuerpo);
        this.miFormulario.controls['id_categoria'].setValue(
          this.noticia.id_categoria
        );

        this.esVisible = this.noticia.visible;
        if (this.esVisible == 0) {
          this.miFormulario.controls['visible'].setValue(false);
        } else {
          this.miFormulario.controls['visible'].setValue(true);
        }
      });
  }

  get visible(): string {
    if (
      this.miFormulario.get('visible')?.value == false ||
      this.miFormulario.get('visible')?.value == 0
    ) {
      return 'No visible';
    }
    return 'Visible';
  }

  miFormulario: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    email_usuario: ['', [Validators.required]],
    cuerpo: ['', [Validators.required]],
    id_categoria: ['', [Validators.required]],
    visible: [false, [Validators.required]],
  });

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

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
        return `${year}-0${month}-${day}`;
      } else {
        return `${year}-${month}-${day}`;
      }
    }
  }

  editarNoticia() {
    if (
      this.miFormulario.get('email_usuario')?.value == 'null' ||
      this.miFormulario.get('id_categoria')?.value == 'null'
    ) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Datos incompletos',
        text: 'Por favor, rellene todos los campos requeridos',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    this.noticia = this.miFormulario.value;

    if (this.estabaVisible == 0 && this.noticia.visible == true) {
      Swal.fire({
        title: '¿Quieres que la noticia vuelva a ser de las recientes?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No, mantener la fecha de lanzamiento',
      }).then((result) => {
        if (result.isConfirmed) {
          this.noticia.fecha = this.fechaActual();
          this.confirmarCambios(this.noticia);
        } else {
          this.noticia.fecha = this.fechaLanzamiento;
          this.confirmarCambios(this.noticia);
        }
      });
    } else {
      this.noticia.fecha = this.fechaLanzamiento;
      this.confirmarCambios(this.noticia);
    }
  }

  confirmarCambios(noticia: Noticia) {
    this.noticia.id = this.id;
    this.noticia.fecha_edit = this.fechaActual();
    if (this.miFormulario.get('visible')?.value == false) {
      this.noticia.visible = 0;
    } else {
      this.noticia.visible = 1;
    }
    this.noticia.imagen = this.nombreFichero;
    this.adminService.editarNoticia(this.noticia).subscribe((resp) => {
      if (resp == null) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Datos correctamente actualizados',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
    if (this.noticia.imagen != '' && this.nombreFichero!=this.imagenGuardada) {
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
        //console.log(this.file_data);
      } else {
        //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
      }
    }
  }
  
  uploadFile() {
    this.previsualizacion = '';
    this.mostrarImagen = true;
    this.noticia.imagen=this.nombreFichero;
    this.adminService.uploadFile(this.file_data).subscribe((resp) => {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.adminService.getNoticiaPorId(id)))
        .subscribe((noticia) => {
        this.noticia = noticia;
        });
      this.noticia.imagen = '';
    });
    this.noticia.imagen = '';
  }

  capturarFile(event: any): any {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
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
