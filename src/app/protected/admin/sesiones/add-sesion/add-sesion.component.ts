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
  // sesion!: Sesion;
  // actividades: any;
  // horario!: Horario;

  // salas: any;
  // // minDate!: Date;
  // // maxDate!: any;
  // constructor(private fb: FormBuilder, private adminService: AdminService) {
  //   // const mes = new Date().getMonth();
  //   // const año = new Date().getFullYear();
  //   // this.minDate = new Date();
  //   // this.maxDate = new Date(año, mes + 2, 0);
  // }

  // ngOnInit(): void {
  //   this.adminService.getSalas().subscribe((sala) => {
  //     this.salas = sala;
  //   });

  //   this.adminService.getActividades().subscribe((actividad) => {
  //     this.actividades = actividad;
  //   });
  // }

  // miFormulario: FormGroup = this.fb.group({
  //   fecha: ['', [Validators.required]],
  //   id_sala: ['', [Validators.required]],
  //   id_actividad: ['', [Validators.required]],
  //   hora: ['', [Validators.required]],
  // });

  // campoNoValido(campo: string) {
  //   return (
  //     this.miFormulario.get(campo)?.invalid &&
  //     this.miFormulario.get(campo)?.touched
  //   );
  // }

  // addSesion() {

  //  this.horario ={
  //    hora:1,
  //    sala:2,
  //    inicio:"21:00",
  //    fin:"22:00"
  //  }
  //   this.sesion = this.miFormulario.value;
  //   const fecha = this.miFormulario.get('fecha')?.value.toString();
  //   this.sesion.fecha=fecha;
  //   this.sesion.horarios = this.horario;

  //    console.log(this.sesion);
  //   this.adminService.addSesion(this.sesion).subscribe((resp) => {
  //     if (resp == null) {
  //       Swal.fire({
  //         position: 'top-end',
  //         icon: 'success',
  //         title: `La sesion se ha añadido correctamente!`,
  //         showConfirmButton: false,
  //         timer: 2000,
  //       });
  //     }
  //   });
  // }
  actividades: any;

  salas: any;
  sesion!: Sesion;
  id!: number;
  today!: Date;
  fin!: any;
 
  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.today = new Date();
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
    console.log(this.sesion);
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
