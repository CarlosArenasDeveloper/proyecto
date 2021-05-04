import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Musculo } from '../../../../models/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-edit-musculo',
  templateUrl: './edit-musculo.component.html',
  styleUrls: ['./edit-musculo.component.css']
})
export class EditMusculoComponent implements OnInit {

  musculo: Musculo={};
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ nombre }) => this.adminService.getMusculoPorNombre(nombre)))
      .subscribe((musculo) => {
        this.musculo = musculo;
        this.miFormulario.controls['nombre'].setValue(this.musculo.nombre);
        this.miFormulario.controls['descripcion'].setValue(
          this.musculo.descripcion
        );
        this.miFormulario.controls['imagen'].setValue(this.musculo.imagen);
      });
  }

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


  editarMusculo() {
    this.musculo = this.miFormulario.value;
    this.adminService.editarMusculo(this.musculo).subscribe((resp) => {
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
