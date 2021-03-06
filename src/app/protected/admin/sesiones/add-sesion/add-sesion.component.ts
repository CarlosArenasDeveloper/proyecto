import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sesion, Actividad, Horario } from '../../../../models/interface';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-sesion',
  templateUrl: './add-sesion.component.html',
  styleUrls: ['./add-sesion.component.css'],
})
export class AddSesionComponent implements OnInit {
  actividades: any;
  salas: any;
  sesion!: Sesion;
  id!: number;
  today!: Date;
  fin!: any;
  localeES: any;
  isEspanish: boolean = true;
  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private translateService: TranslateService
  ) {
    this.today = new Date();

    if (localStorage.getItem('lang') == 'en') {
      this.isEspanish = false;
    }
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
  });

  ngOnInit() {
    this.miFormulario.controls['start'].setValue(
      new Date(localStorage.getItem('fecha')!)
    );

    this.miFormulario.controls['end'].setValue(
      new Date(localStorage.getItem('fecha')!)
    );

    this.adminService.getSalas().subscribe((sala) => {
      this.salas = sala;
    });

    this.adminService.getActividades().subscribe((actividad) => {
      this.actividades = actividad;
    });
  }

  add() {
    this.sesion = this.miFormulario.value;
    const inicio = new Date(this.sesion.start!);
    const final = new Date(this.sesion.end!);
    let resta = final.getTime() - inicio.getTime();

    if (resta > 0) {
      this.adminService.addSesion(this.sesion).subscribe((resp) => {
        if (resp != 'error') {
          Swal.fire({
            position: 'top-end',
            icon: `success`,
            title: `${this.translateService.instant(
              'Se ha creado la sesion correctamente'
            )}`,
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: `${this.translateService.instant(
              'Error al crear la sesion'
            )}`,
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
}
