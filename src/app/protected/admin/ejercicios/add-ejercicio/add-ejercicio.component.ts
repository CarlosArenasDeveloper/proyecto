import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ejercicio, Musculo } from '../../../../models/interface';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-ejercicio',
  templateUrl: './add-ejercicio.component.html',
  styleUrls: ['./add-ejercicio.component.css']
})
export class AddEjercicioComponent implements OnInit {
  previsualizacion!: string;
  public archivos: any = [];
  file=new FormControl('');
  archivo = {
    nombre: '',
    nombreArchivo: '',
    base64textString: ''
  }
  file_data:any='';
  nombreFichero:string='';


  ejercicio!: Ejercicio;
  musculos: any;
  constructor(private fb: FormBuilder, private adminService: AdminService,
    private sanitizer: DomSanitizer,private translateService:TranslateService
    ) {}

  ngOnInit(): void {
      this.adminService.getMusculos().subscribe(musculo=>{
        this.musculos=musculo;
      })
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

  addEjercicio() {
    this.ejercicio = this.miFormulario.value;
    this.ejercicio.imagen=this.nombreFichero;
    this.adminService.addEjercicio(this.ejercicio).subscribe((resp) => {
      //console.log(resp);
      if (resp == null) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${this.translateService.instant('El ejercicio')} ${this.ejercicio.nombre} ${this.translateService.instant('se ha añadido correctamente')}!`,
          showConfirmButton: false,
          timer: 2000,
        });
        
      }
    });
    if (this.ejercicio.imagen != '') {
      this.uploadFile();
    }
  }

  fileChange(event:any) {

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
        //console.log('finfo',file.name,file.size,file.type);
        //max file size is 4 mb
        this.nombreFichero = file.name;
        if((file.size/1048576)<=4)
        {
          let formData = new FormData();
          let info={id:2,name:'raja'}
          formData.append('file', file, file.name);
          formData.append('id','2');
          formData.append('tz',new Date().toISOString())
          formData.append('update','2')
          formData.append('info',JSON.stringify(info))
          this.file_data=formData
          //this.noticia.imagen=file.name
        }else{
          //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
        }

    }

  }
  uploadFile(){
    this.adminService.uploadFile(this.file_data).subscribe(resp=>{
      //console.log(resp);
    })
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
