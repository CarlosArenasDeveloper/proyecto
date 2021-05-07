import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  AddNoticiaComponent,
} from '../../noticias/add-noticia/add-noticia.component';
import { AdminService } from '../../../services/admin.service';
import { Categoria } from '../../../../models/interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css'],
})
export class AddCategoriaComponent {
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    public dialogRef: MatDialogRef<AddNoticiaComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
  });

  onNoClick(): void {
    this.dialogRef.close();
  }
  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }
  addCategoria() {
    this.adminService
      .addCategoria(this.miFormulario.get('nombre')?.value)
      .subscribe((resp) => {
        if (resp != 'ya existe') {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Categoria añadida correctamente',
            showConfirmButton: false,
            timer: 2000,
          });
          this.dialogRef.close();
        } else if (resp == 'ya existe') {
          Swal.fire({
            icon: 'error',
            title:
              'Ya existe la categoria ' +
              this.miFormulario.get('nombre')?.value,
            text:
              'Por favor, introduzca el nombre de una categoria que no exista',
          });
        }
      });
  }
}
