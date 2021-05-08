import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sesion } from '../../../../models/interface';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-sesion',
  templateUrl: './add-sesion.component.html',
  styleUrls: ['./add-sesion.component.css'],
})
export class AddSesionComponent implements OnInit {
  sesion!: Sesion;
  salas: any;
  minDate!: Date;
  maxDate!: any;
  constructor(private fb: FormBuilder, private adminService: AdminService) {
    const mes = new Date().getMonth();
    const año = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(año,mes+2,0);

  }

  ngOnInit(): void {
    this.adminService.getSalas().subscribe((sala) => {
      this.salas = sala;
    });
  }

  miFormulario: FormGroup = this.fb.group({
    fecha: ['', [Validators.required]],
    id_sala: ['', [Validators.required]],
    hora: ['', [Validators.required]],
  });

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  addSesion() {
    console.log(this.miFormulario.value);
    this.sesion = this.miFormulario.value;
    this.adminService.addSesion(this.sesion).subscribe((resp) => {
      console.log(resp);
      if (resp == null) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `La sesion se ha añadido correctamente!`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }
}
