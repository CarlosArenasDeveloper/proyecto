import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Noticia } from '../../../../models/interface';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-noticia',
  templateUrl: './edit-noticia.component.html',
  styleUrls: ['./edit-noticia.component.css'],
})
export class EditNoticiaComponent implements OnInit {
  categorias: any;
  editores:any
  noticia: Noticia = {};
  id!: number;
  esVisible: any;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
        console.log(noticia);
        this.noticia = noticia;
        this.id = noticia.id!;
        this.miFormulario.controls['titulo'].setValue(this.noticia.titulo);
        this.miFormulario.controls['email_usuario'].setValue(this.noticia.email_usuario);
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
    imagen: [''],
  });

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  editarNoticia() {
    this.noticia = this.miFormulario.value;
    this.noticia.id = this.id;
    this.noticia.fecha_edit=new Date();
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
  }
}
