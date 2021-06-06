import {
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Noticia, Usuario } from '../../../../models/interface';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {
  MatDialog,
} from '@angular/material/dialog';
import { AddCategoriaComponent } from '../../categorias/add-categoria/add-categoria.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-noticia',
  templateUrl: './add-noticia.component.html',
  styleUrls: ['./add-noticia.component.css'],
})
export class AddNoticiaComponent implements OnInit {
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
  
  editor!: Usuario;
  noticia!: Noticia;
  categorias: any;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCategoriaComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.adminService.getCategorias().subscribe((resp) => {
        this.categorias = resp;
      });
    });
  }

  ngOnInit(): void {
    this.editor = JSON.parse(sessionStorage.getItem('usuario')!);
    this.adminService.getCategorias().subscribe((categoria) => {
      this.categorias = categoria;
    });
  }

  miFormulario: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
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

  get visible(): string {
    if (this.miFormulario.get('visible')?.value == false) {
      return 'No visible';
    }
    return 'Visible';
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
        //console.log(`${year}-0${month}-${day}`);
        return `${year}-0${month}-${day}`;
      } else {
       // console.log(`${year}-${month}-${day}`);
        return `${year}-${month}-${day}`;
      }
    }
  }

  addNoticia() {
    this.noticia = this.miFormulario.value;
    this.noticia.email_usuario = this.editor.email;
    this.noticia.fecha = this.fechaActual();
    this.noticia.imagen=this.nombreFichero;
    if(this.miFormulario.get('visible')?.value==false){
      this.noticia.visible=0;
    }
    
    this.adminService.addNoticia(this.noticia).subscribe((resp) => {
      if (resp == null) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `La noticia "${this.noticia.titulo}" se ha añadido correctamente!`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
    if (this.noticia.imagen != '') {
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
      console.log(resp);
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
}
