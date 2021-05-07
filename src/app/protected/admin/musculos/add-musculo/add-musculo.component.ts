import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Musculo } from '../../../../models/interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-musculo',
  templateUrl: './add-musculo.component.html',
  styleUrls: ['./add-musculo.component.css']
})
export class AddMusculoComponent implements OnInit {

  musculo!: Musculo;
  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit(): void {}

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    imagen: ['']
  });

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  addMusculo() {
    this.musculo = this.miFormulario.value;
    this.adminService.addMusculo(this.musculo).subscribe((resp) => {
      console.log(resp);
      if (resp == null) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `El musculo ${this.musculo.nombre} se ha añadido correctamente!`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }

}
