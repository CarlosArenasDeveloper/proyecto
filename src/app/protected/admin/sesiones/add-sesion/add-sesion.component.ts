import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sesion, Actividad, Horario } from '../../../../models/interface';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

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
  isEspanish:boolean=true;
  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
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
    //console.log(this.sesion);
    this.adminService.addSesion(this.sesion).subscribe((resp) => {
      if (resp != 'error') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se ha creado la sesion correctamente',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear la sesion.',
          text: `Por favor, compruebe que la sala este libre o que la actividad este no duplicada en la franja horaria seleccionada.`,
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
}
