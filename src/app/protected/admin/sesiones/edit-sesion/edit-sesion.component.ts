import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Sesion } from '../../../../models/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-edit-sesion',
  templateUrl: './edit-sesion.component.html',
  styleUrls: ['./edit-sesion.component.css'],
})
export class EditSesionComponent implements OnInit {
  sesion!: any;
  id!: number;
  public today: Date;
  event!: Event;
  showEnd!: boolean;
  fin!: any;
  salas: any;
  actividades: any;
  localeES: any;
  isEspanish: boolean = true;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService
  ) {
    if (localStorage.getItem('lang') == 'en') {
      this.isEspanish = false;
    }
    this.today = new Date();
    this.localeES = {
      firstDayOfWeek: 1,
      dayNames: [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
      ],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
      ],
      monthNamesShort: [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'sep',
        'oct',
        'nov',
        'dic',
      ],
      today: 'Hoy',
      clear: 'Borrar',
    };
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
        //console.log(this.id);
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
    if (
      this.miFormulario.get('title')?.value == 'null' ||
      this.miFormulario.get('sala')?.value == 'null'
    ) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `${this.translateService.instant('Datos incompletos')}`,
        text: `${this.translateService.instant(
          'Por favor, rellene todos los campos requeridos'
        )}`,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    this.sesion = this.miFormulario.value;
    const inicio = new Date(this.sesion.start!);
    const final = new Date(this.sesion.end!);
    let resta = final.getTime() - inicio.getTime();
    if (resta > 0) {
      this.sesion.id = this.id;
      this.adminService.editarSesion(this.sesion).subscribe((resp) => {
        if (resp != 'error') {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${this.translateService.instant(
              'Datos correctamente actualizados'
            )}`,
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: `${this.translateService.instant(
              'Error al editar la sesion'
            )}.`,
            text: `${this.translateService.instant(
              'Por favor, compruebe que la sala este libre o que la actividad este no duplicada en la franja horaria seleccionada.'
            )}`,
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: `${this.translateService.instant(
          'Hora de final de sesion incorrecta'
        )}`,
        text: `${this.translateService.instant(
          'El final de la sesion no puede ser antes o igual que el comienzo de la sesion'
        )}`,
      });
    }
  }

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  cancelar() {
    if (this.sesion.estado == 'cancelada') {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `${this.translateService.instant(
          'La sesión ya esta cancelada'
        )}`,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        title: `${this.translateService.instant(
          '¿Estas seguro de querer cancelar la sesion?'
        )}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `${this.translateService.instant('Si, cancelar')}`,
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          const idsesion = parseInt(this.sesion.id);
          //console.log(idsesion);
          this.adminService.cancelarSesion(idsesion).subscribe((resp) => {
            if (resp == null) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${this.translateService.instant(
                  'Sesion cancelada correctamente'
                )}`,
                showConfirmButton: false,
                timer: 2000,
              }).then((result) => {
                this.router.navigateByUrl('dashboard/admin/sesiones');
              });
            }
          });
        }
      });
    }
  }
}
