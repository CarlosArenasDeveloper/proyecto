import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Musculo } from '../../../../models/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-edit-musculo',
  templateUrl: './edit-musculo.component.html',
  styleUrls: ['./edit-musculo.component.css']
})
export class EditMusculoComponent implements OnInit {
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
  musculo: Musculo={};
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ nombre }) => this.adminService.getMusculoPorNombre(nombre)))
      .subscribe((musculo) => {
        this.musculo = musculo;
        //console.log(this.musculo);
        this.imagenGuardada=musculo.imagen!
        this.nombreFichero=musculo.imagen!
        this.miFormulario.controls['nombre'].setValue(this.musculo.nombre);
        this.miFormulario.controls['descripcion'].setValue(
          this.musculo.descripcion
        );
      });
  }

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
  });

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }


  editarMusculo() {
    this.musculo = this.miFormulario.value;
    this.musculo.imagen = this.nombreFichero;
    this.adminService.editarMusculo(this.musculo).subscribe((resp) => {
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
    if (this.musculo.imagen != '' && this.nombreFichero!=this.imagenGuardada) {
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
      } else {
        //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
      }
    }
  }
  
  uploadFile() {
    this.previsualizacion = '';
    this.mostrarImagen = true;
    this.musculo.imagen=this.nombreFichero;
    this.adminService.uploadFile(this.file_data).subscribe((resp) => {
      this.activatedRoute.params
        .pipe(switchMap(({ nombre }) => this.adminService.getMusculoPorNombre(nombre)))
        .subscribe((musculo) => {
        this.musculo = musculo;
        //console.log(this.musculo);
        });
        this.musculo.imagen = '';
    });
    this.musculo.imagen = '';

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
