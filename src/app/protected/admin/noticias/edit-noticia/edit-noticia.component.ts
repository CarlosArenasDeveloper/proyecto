import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Noticia } from '../../../../models/interface';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-noticia',
  templateUrl: './edit-noticia.component.html',
  styleUrls: ['./edit-noticia.component.css'],
})
export class EditNoticiaComponent implements OnInit {
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
    private activatedRoute: ActivatedRoute
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
    imagen: [''],
  });

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
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
          this.noticia.fecha = new Date();
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
    this.noticia.fecha_edit = new Date();
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
