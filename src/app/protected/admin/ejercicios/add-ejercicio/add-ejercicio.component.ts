import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ejercicio, Musculo } from '../../../../models/interface';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-ejercicio',
  templateUrl: './add-ejercicio.component.html',
  styleUrls: ['./add-ejercicio.component.css']
})
export class AddEjercicioComponent implements OnInit {

  ejercicio!: Ejercicio;
  musculos: any;
  constructor(private fb: FormBuilder, private adminService: AdminService) {}

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
      imagen:[''],
      video:[''],

  });

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  addEjercicio() {
    console.log(this.miFormulario.value);
    this.ejercicio = this.miFormulario.value;
    console.log(this.ejercicio);
    this.adminService.addEjercicio(this.ejercicio).subscribe((resp) => {
      console.log(resp);
      if (resp == null) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `El ejercicio ${this.ejercicio.nombre} se ha añadido correctamente!`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }

}
