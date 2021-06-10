import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  datosIncorrectos: boolean = false;
  hide = true;
  oculto = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService
  ) {}
  miFormulario: FormGroup = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
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
  login() {
    if (this.miFormulario.invalid) {
      return;
    }
    const { email, password } = this.miFormulario.value;
    this.authService.login(email, password).subscribe((datosUsuario) => {
      if (datosUsuario != 'error') {
        datosUsuario.password = '************';
        sessionStorage.setItem('usuario', JSON.stringify(datosUsuario));
        if (datosUsuario.role == 1) {
          this.router.navigateByUrl('/dashboard/admin');
        } else if (datosUsuario.role == 2 && datosUsuario.estado == 'baja') {
          Swal.fire({
            icon: 'error',
            title: this.translate.instant(
              'No se puede acceder a fit & healthy'
            ),
            text: `${this.translate.instant(
              'Hola'
            )} ${datosUsuario.nombre?.toUpperCase()}, ${this.translate.instant(
              'actualmente usted está dado de baja, ¿Quieres darte de alta de nuevo?'
            )}`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: this.translate.instant('Si'),
            cancelButtonText: this.translate.instant('No, cancelar'),
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: `${this.translate.instant('Alta pendiente de validacion')}`,
                text:`${this.translate.instant('Para completar el alta, haga click en el enlace que le hemos enviado al correo electronico')} ${this.miFormulario.get('email')?.value}`,
                showConfirmButton: false,
                timer: 3500,
              }).then(()=>{
                this.authService.solicitudAlta(this.miFormulario.get('email')?.value).subscribe(()=>{
                  console.log("solicitud alta");
                })
              })
            }
          });
        } else if (
          datosUsuario.role == 2 &&
          datosUsuario.estado == 'bloqueado'
        ) {
          Swal.fire({
            icon: 'error',
            title: this.translate.instant('Bloqueado'),
            text: `${this.translate.instant(
              'Hola'
            )} ${datosUsuario.nombre?.toUpperCase()}, ${this.translate.instant(
              'usted está bloqueado, para volver a acceder pongase en contacto con el personal de Fit & Healthy'
            )}`,
          });
        } else if (datosUsuario.role == 2 && datosUsuario.verificado == 1) {
          this.router.navigateByUrl('/dashboard/cliente');
        } else if (datosUsuario.role == 2 && datosUsuario.verificado == 0) {
          sessionStorage.removeItem('usuario');
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${this.translate.instant(
              'Hola'
            )} ${datosUsuario.nombre?.toUpperCase()}, ${this.translate.instant(
              'para acceder a Fit & Healthy debe verificar su email. Se ha enviado un correo a la direccion de'
            )}  ${datosUsuario.email} `,
          }).then((result) => {
            if (result.isConfirmed) {
              this.authService
                .enviarVerificacionBis(email)
                .subscribe((resp) => {});
            }
          });
        } else {
          this.router.navigateByUrl('/dashboard/monitor');
        }
      } else {
        this.miFormulario.reset();
        this.datosIncorrectos = true;
        Swal.fire({
          icon: 'error',
          title: this.translate.instant(
            'Error al intentar acceder a Fit & Healthy!'
          ),
          text: this.translate.instant(
            'El email y la contraseña que ingresaste no coinciden con nuestros registros. Por favor, revisa e inténtelo de nuevo.'
          ),
        });
      }
    });
  }
}
