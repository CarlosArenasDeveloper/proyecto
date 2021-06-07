import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddNoticiaComponent } from '../../noticias/add-noticia/add-noticia.component';
import { AdminService } from '../../../services/admin.service';
import { Sala } from '../../../../models/interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-add-sala',
  templateUrl: './add-sala.component.html',
  styleUrls: ['./add-sala.component.css'],
})
export class AddSalaComponent {
  sala!: Sala;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    public dialogRef: MatDialogRef<AddNoticiaComponent>,
    private translateService:TranslateService
  ) //@Inject(MAT_DIALOG_DATA) public data: DialogData
  {}

  miFormulario: FormGroup = this.fb.group({
    aforo: ['', [Validators.required]],
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
  addSala() {
    this.sala = this.miFormulario.value;
    this.adminService.addSala(this.sala).subscribe((resp) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${this.translateService.instant('Sala añadida correctamente')}`,
        showConfirmButton: false,
        timer: 2000,
      });
      this.dialogRef.close();
    });
  }
}
