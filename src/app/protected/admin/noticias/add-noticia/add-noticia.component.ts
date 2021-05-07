import {
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Noticia, Usuario } from '../../../../models/interface';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {
  MatDialog,
} from '@angular/material/dialog';
import { AddCategoriaComponent } from '../../categorias/add-categoria/add-categoria.component';

@Component({
  selector: 'app-add-noticia',
  templateUrl: './add-noticia.component.html',
  styleUrls: ['./add-noticia.component.css'],
})
export class AddNoticiaComponent implements OnInit {
  editor!: Usuario;
  noticia!: Noticia;
  categorias: any;
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
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
    imagen: [''],
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
  addNoticia() {
    this.noticia = this.miFormulario.value;
    this.noticia.email_usuario = this.editor.email;
    this.noticia.fecha = new Date();

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
  }

}
