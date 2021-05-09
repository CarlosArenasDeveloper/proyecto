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
@Component({
  selector: 'app-edit-sala',
  templateUrl: './edit-sala.component.html',
  styleUrls: ['./edit-sala.component.css'],
})
export class EditSalaComponent implements OnInit {
  id!: number;
  sala!: Sala;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    public dialogRef: MatDialogRef<AddNoticiaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; aforo: number }
  ) {}
  ngOnInit(): void {
    this.miFormulario.get('aforo')?.setValue(this.data.aforo);
  }

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

  editarSala() {
    this.sala = this.miFormulario.value;
    this.sala.id = this.data.id;
    this.adminService.editarSala(this.sala).subscribe((resp) => {
      if (resp == null) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Datos correctamente actualizados',
          showConfirmButton: false,
          timer: 2000,
        });
        this.dialogRef.close();
      }
    });
  }
}
