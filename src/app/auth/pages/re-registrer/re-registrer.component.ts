import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../../protected/services/admin.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-re-registrer',
  templateUrl: './re-registrer.component.html',
  styleUrls: ['./re-registrer.component.css'],
})
export class ReRegistrerComponent implements OnInit {
  datosIncorrectos: boolean = false;
  usuario!: Usuario;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private adminService: AdminService,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    this.usuario = usuario;
  }

  sesion(): boolean {
    if (sessionStorage.getItem('usuario')) {
      return true;
    }
    return false;
  }
  miFormulario: FormGroup = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
  });
  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.required) {
      return this.translate.instant('El email es obligatorio');
    } else if (errors?.pattern) {
      return this.translate.instant(
        'El valor ingresado no tiene formato de correo'
      );
    }
    return '';
  }

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  enviar() {
    this.authService
      .getUsuarioPorEmail(this.miFormulario.get('email')?.value)
      .subscribe((usuario) => {
        if (usuario != 'error') {
          this.usuario = usuario;
          if (this.usuario.estado == 'baja') {
            Swal.fire({
              position: 'top-end',
              icon: 'warning',
              title: `${this.translate.instant(
                'Alta pendiente de validacion'
              )}`,
              text: `${this.translate.instant(
                'Para completar el alta, haga click en el enlace que le hemos enviado al correo electronico'
              )} ${this.miFormulario.get('email')?.value}`,
              showConfirmButton: false,
              timer: 3500,
            }).then(() => {
              this.authService
                .solicitudAlta(this.miFormulario.get('email')?.value)
                .subscribe(() => {});
            });
          } else if (this.usuario.estado == 'bloqueado') {
            Swal.fire({
              icon: 'error',
              title: this.translate.instant('Bloqueado'),
              text: `${this.translate.instant(
                'Hola'
              )} ${this.usuario.nombre?.toUpperCase()}, ${this.translate.instant(
                'usted está bloqueado, para volver a acceder pongase en contacto con el personal de Fit & Healthy'
              )}`,
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'warning',
              title: `${this.translate.instant('Hola')} ${this.usuario.nombre}`,
              text: `${this.translate.instant(
                'Actualmente esta dado de alta, para accerder a Fit & Healthy introduzca su email y contraseña en el acceso a clientes'
              )} `,
              showConfirmButton: false,
              timer: 3200,
            }).then(() => {
              this.router.navigateByUrl('auth/login');
            });
          }
        }else{
          Swal.fire({
            icon: 'error',
            title: `${this.translate.instant('Email no registrado')}`,
            text:
              `${this.translate.instant('El email que ingresaste no coincide con nuestros registros. Por favor, revisa e inténtelo de nuevo.')}`,
          });
        }
      });
  }
}
