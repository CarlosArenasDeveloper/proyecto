import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actividad, Usuario } from '../../../../models/interface';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-actividad',
  templateUrl: './edit-actividad.component.html',
  styleUrls: ['./edit-actividad.component.css'],
})
export class EditActividadComponent implements OnInit {
  usuario!: Usuario;
  id!: number;
  monitores: any;
  actividad!: Actividad;
  tarifas: any;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    this.usuario = usuario;

    this.adminService.getMonitores().subscribe((monitor) => {
      this.monitores = monitor;
    });

    this.adminService.getTarifas().subscribe((tarifa) => {
      this.tarifas = tarifa;
    });

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.adminService.getActividadPorId(id)))
      .subscribe((actividad) => {
        console.log(actividad);
        this.actividad = actividad;
        this.id = actividad.id!;
        this.miFormulario.controls['nombre'].setValue(this.actividad.nombre);
        this.miFormulario.controls['email_monitor'].setValue(
          this.actividad.email_monitor
        );
        this.miFormulario.controls['id_tarifa'].setValue(this.actividad.id_tarifa);
        this.miFormulario.controls['descripcion'].setValue(
          this.actividad.descripcion
        );
        this.miFormulario.controls['duracion'].setValue(
          this.actividad.duracion
        );
     
      });
  }

  isAdmin() {
    if (this.usuario.role == 1) {
      return true;
    }
    return false;
  }
  
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    email_monitor: ['', [Validators.required]],
    id_tarifa: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    duracion: ['', [Validators.required, Validators.pattern('^[0-9]{2}$')]],
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
  editarActividad() {
    
    if (
      this.miFormulario.get('email_monitor')?.value == 'null' || this.miFormulario.get('id_tarifa')?.value == 'null'
    ) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Datos incompletos',
        text:'Por favor, rellene todos los campos requeridos',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    this.actividad = this.miFormulario.value;
    this.actividad.id = this.id;
    this.adminService.editarActividad(this.actividad).subscribe((resp) => {
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
