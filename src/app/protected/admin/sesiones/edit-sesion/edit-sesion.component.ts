import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Sesion } from '../../../../models/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-edit-sesion',
  templateUrl: './edit-sesion.component.html',
  styleUrls: ['./edit-sesion.component.css'],
})
export class EditSesionComponent implements OnInit {
  // sesion: Sesion = {};
  // id!: number;
  // salas: any;
  // actividades:any;
  // // minDate!: Date;
  // // maxDate!: any;

  // constructor(
  //   private fb: FormBuilder,
  //   private adminService: AdminService,
  //   private activatedRoute: ActivatedRoute
  // ) {
  //   // const mes = new Date().getMonth();
  //   // const año = new Date().getFullYear();
  //   // this.minDate = new Date();
  //   // this.maxDate = new Date(año, mes + 2, 0);
  // }

  // ngOnInit(): void {
  //   $('.tooltip').remove();

  //   this.adminService.getSalas().subscribe((sala) => {
  //     this.salas = sala;
  //   });
  //   this.adminService.getActividades().subscribe((actividad)=>{
  //     this.actividades=actividad
  //   })

  //   this.activatedRoute.params
  //     .pipe(switchMap(({ id }) => this.adminService.getSesionPorId(id)))
  //     .subscribe((sesion) => {
  //       console.log(sesion);
  //       this.sesion = sesion;
  //       this.id = sesion.id!;
  //       this.miFormulario.controls['id_sala'].setValue(this.sesion.id_sala);
  //       this.miFormulario.controls['id_actividad'].setValue(this.sesion.id_actividad);
  //       this.miFormulario.controls['fecha'].setValue(this.sesion.fecha);
  //       this.miFormulario.controls['hora'].setValue(this.sesion.hora);
  //       this.miFormulario.controls['num_clientes'].setValue(
  //         this.sesion.num_clientes
  //       );
  //       this.miFormulario.controls['estado'].setValue(this.sesion.estado);
  //     });
  // }

  // miFormulario: FormGroup = this.fb.group({
  //   fecha: ['', [Validators.required]],
  //   id_sala: ['', [Validators.required]],
  //   id_actividad: ['', [Validators.required]],
  //   hora: ['', [Validators.required]],
  //   estado: ['', [Validators.required]],
  //   num_clientes: ['', [Validators.required]],
  // });

  // campoNoValido(campo: string) {
  //   return (
  //     this.miFormulario.get(campo)?.invalid &&
  //     this.miFormulario.get(campo)?.touched

  //   );
  // }

  // editarSesion() {
  //   if (
  //     this.miFormulario.get('id_sala')?.value == 'null' || this.miFormulario.get('id_actividad')?.value == 'null'
  //   ) {
  //     Swal.fire({
  //       position: 'top-end',
  //       icon: 'error',
  //       title: 'Datos incompletos',
  //       text:'Por favor, rellene todos los campos requeridos',
  //       showConfirmButton: false,
  //       timer: 2000,
  //     });
  //     return;
  //   }

  //   this.sesion = this.miFormulario.value;
  //   this.sesion.id = this.id;
  //   console.log(this.sesion);
  //   this.adminService.editarSesion(this.sesion).subscribe((resp) => {
  //     if (resp == null) {
  //       Swal.fire({
  //         position: 'top-end',
  //         icon: 'success',
  //         title: 'Datos correctamente actualizados',
  //         showConfirmButton: false,
  //         timer: 2000,
  //       });
  //     }
  //   });
  // }

  // cambiarEstado() {
  //   Swal.fire({
  //     title: 'Cambiar estado',
  //     showDenyButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: `FINALIZADA`,
  //     denyButtonText: `COMPLETA`,
  //     cancelButtonText: `INCOMPLETA`,
  //     cancelButtonColor: `#2778c4`,
  //     confirmButtonColor: `#757575`,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: `¿Estas seguro de que querer cambiar el estado de la sesión a finalizada ?`,
  //         icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonColor: '#3085d6',
  //         cancelButtonColor: '#d33',
  //         confirmButtonText: 'Si, cambiar',
  //         cancelButtonText: 'No, cancelar',
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           this.miFormulario.get('estado')?.setValue('finalizada');
  //         }
  //       });
  //     } else if (result.isDenied) {
  //       Swal.fire({
  //         title: `¿Estas seguro de que querer cambiar el estado de la sesión a completa ?`,
  //         icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonColor: '#3085d6',
  //         cancelButtonColor: '#d33',
  //         confirmButtonText: 'Si, cambiar',
  //         cancelButtonText: 'No, cancelar',
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           this.miFormulario.get('estado')?.setValue('completa');
  //         }
  //       });
  //     } else {
  //       Swal.fire({
  //         title: `¿Estas seguro de que querer cambiar el estado de la sesión a incompleta ?`,
  //         icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonColor: '#3085d6',
  //         cancelButtonColor: '#d33',
  //         confirmButtonText: 'Si, cambiar',
  //         cancelButtonText: 'No, cancelar',
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           this.miFormulario.get('estado')?.setValue('incompleta');
  //         }
  //       });
  //     }
  //   });
  // }
  sesion!: any;
  id!: number;
  public today: Date;
  public localeES: any;
  event!: Event;
  showEnd!: boolean;
  fin!: any;
  salas: any;
  actividades: any;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.today = new Date();
  }

  miFormulario: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    start: ['', [Validators.required]],
    end: ['', [Validators.required]],
    sala: ['', [Validators.required]],
    num_clientes: ['', [Validators.required]],
    estado: ['', [Validators.required]],
  });

  ngOnInit() {
    $('.tooltip').remove();

    this.adminService.getSalas().subscribe((sala) => {
      this.salas = sala;
    });
    this.adminService.getActividades().subscribe((actividad) => {
      this.actividades = actividad;
    });

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.adminService.getPruebaID(id)))
      .subscribe((sesion) => {
        this.sesion = sesion;
        this.id = this.sesion.id;
        console.log(this.id);
        this.fin = new Date(this.sesion.start);

        this.miFormulario.controls['title'].setValue(this.sesion.title);

        this.miFormulario.controls['start'].setValue(
          new Date(this.sesion.start)
        );
        this.miFormulario.controls['end'].setValue(new Date(this.sesion.end));

        this.miFormulario.controls['sala'].setValue(this.sesion.sala);
        this.miFormulario.controls['num_clientes'].setValue(
          this.sesion.num_clientes
        );
        this.miFormulario.controls['estado'].setValue(this.sesion.estado);
      });
  }

  editarSesion() {
    this.sesion = this.miFormulario.value;
    this.sesion.id = this.id;
    this.adminService.editarSesion(this.sesion).subscribe((resp) => {
      if (resp != 'error') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Datos correctamente actualizados',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al editar la sesion.',
          text: `Por favor, compruebe que la sala este libre o que la actividad este no duplicada en la franja horaria seleccionada.`,
        });
      }
    });
  }

  borrar() {
    this.adminService.borrarPrueba(this.sesion.id).subscribe((resp) => {
      if (resp == null) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Evento borrado correctamente',
          showConfirmButton: false,
          timer: 2000,
        }).then((result) => {
          this.router.navigateByUrl('dashboard/admin/sesiones');
        });
      }
    });
  }

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }
  cambiarEstado() {
    Swal.fire({
      title: 'Cambiar estado',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `FINALIZADA`,
      denyButtonText: `COMPLETA`,
      cancelButtonText: `INCOMPLETA`,
      cancelButtonColor: `#2778c4`,
      confirmButtonColor: `#757575`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `¿Estas seguro de que querer cambiar el estado de la sesión a finalizada ?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, cambiar',
          cancelButtonText: 'No, cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.miFormulario.get('estado')?.setValue('finalizada');
          }
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: `¿Estas seguro de que querer cambiar el estado de la sesión a completa ?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, cambiar',
          cancelButtonText: 'No, cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.miFormulario.get('estado')?.setValue('completa');
          }
        });
      } else {
        Swal.fire({
          title: `¿Estas seguro de que querer cambiar el estado de la sesión a incompleta ?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, cambiar',
          cancelButtonText: 'No, cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.miFormulario.get('estado')?.setValue('incompleta');
          }
        });
      }
    });
  }
}
