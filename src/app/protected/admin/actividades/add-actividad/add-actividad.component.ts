import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actividad } from '../../../../models/interface';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-actividad',
  templateUrl: './add-actividad.component.html',
  styleUrls: ['./add-actividad.component.css'],
})
export class AddActividadComponent implements OnInit {
  monitores: any;
  actividad!: Actividad;
  tarifas: any;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
  ) {}

  ngOnInit(): void {
    this.adminService.getMonitores().subscribe((monitor) => {
      this.monitores = monitor;
    });

    this.adminService.getTarifas().subscribe((tarifa)=>{
      this.tarifas=tarifa;
    })
  }

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    email_monitor: ['', [Validators.required]],
    id_tarifa: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    duracion: ['',[Validators.required,Validators.pattern('^[0-9]{2}$')]]
  });

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  get duracionMessage(): string {
    const errors = this.miFormulario.get('duracion')?.errors;
    if (errors?.required) {
      return 'El precio es requerido';
    } else if (errors?.pattern) {
      return 'El valor introducido no corresponde con una duracion valida';
    }
    return '';
  }
  addActividad() {
    console.log(this.miFormulario.value);
    this.actividad = this.miFormulario.value;
    this.adminService.addActividad(this.actividad).subscribe((resp) => {
      if (resp == null) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${this.actividad.nombre} se ha añadido correctamente a la lista de actividades!`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }
}
