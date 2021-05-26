import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Ejercicio } from '../../../../models/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-ejercicio',
  templateUrl: './edit-ejercicio.component.html',
  styleUrls: ['./edit-ejercicio.component.css']
})
export class EditEjercicioComponent implements OnInit {
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


  ejercicio: Ejercicio={};
  id!: number;
  musculos: any;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer

  ) {}

  ngOnInit(): void {
    this.adminService.getMusculos().subscribe(musculo=>{
      this.musculos=musculo;
    })
    
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.adminService.getEjercicioPorId(id)))
      .subscribe((ejercicio) => {
        this.ejercicio = ejercicio;
        this.imagenGuardada=this.ejercicio.imagen!
        this.nombreFichero=this.ejercicio.imagen!

        this.id = ejercicio.id!;
        this.miFormulario.controls['nombre'].setValue(this.ejercicio.nombre);
        this.miFormulario.controls['descripcion'].setValue(
          this.ejercicio.descripcion
        );
        this.miFormulario.controls['nombre_musculo'].setValue(this.ejercicio.nombre_musculo);
        this.miFormulario.controls['video'].setValue(this.ejercicio.video);
        this.miFormulario.controls['nivel'].setValue(this.ejercicio.nivel);
        this.miFormulario.controls['tipo'].setValue(this.ejercicio.tipo);
        this.miFormulario.controls['equipo'].setValue(this.ejercicio.equipo);
      });
  }

  
  miFormulario: FormGroup = this.fb.group({
    nombre:['',[Validators.required]],
    nombre_musculo:['',[Validators.required]],
    nivel:['',[Validators.required]],
    equipo:['',[Validators.required]],
    tipo:['',[Validators.required]],
    descripcion:['',[Validators.required]],
    video:[''],

});

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  editarEjercicio() {

    if (
      this.miFormulario.get('nombre_musculo')?.value == 'null'
    ) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Datos incompletos',
        text:'Por favor, rellene todos los campos requeridos',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    this.ejercicio = this.miFormulario.value;
    this.ejercicio.id = this.id;
    this.ejercicio.imagen = this.nombreFichero;
    console.log(this.ejercicio);
    this.adminService.editarEjercicio(this.ejercicio).subscribe((resp) => {
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

    if (this.ejercicio.imagen != '' && this.nombreFichero!=this.imagenGuardada) {
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
        console.log(this.file_data);
      } else {
        //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
      }
    }
  }
  
  uploadFile() {
    this.previsualizacion = '';
    this.mostrarImagen = true;
    this.ejercicio.imagen=this.nombreFichero;
    this.adminService.uploadFile(this.file_data).subscribe((resp) => {
      console.log(resp);
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.adminService.getEjercicioPorId(id)))
        .subscribe((ejercicio) => {
        this.ejercicio = ejercicio;
        console.log(this.ejercicio);
        //this.ejercicio.imagen=this.nombreFichero
        });
      //this.ejercicio.imagen = '';
    });
    //this.ejercicio.imagen = '';
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
    getVideoIframe(url:any) {
      var video, results;
   
      if (url === null) {
          return '';
      }
      results = url.match('[\\?&]v=([^&#]*)');
      video   = (results === null) ? url : results[1];
   
      return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
  }
}
