import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

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
    private authService: AuthService
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
      return 'Email es obligatorio';
    } else if (errors?.pattern) {
      return 'El valor ingresado no tiene formato de correo';
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
      return ;
    }
    const { email, password } = this.miFormulario.value;
    this.authService.login(email, password).subscribe((datosUsuario) => {
      if (datosUsuario != 'error') {
        sessionStorage.setItem('usuario', JSON.stringify(datosUsuario));
        if (datosUsuario.role == 1) {
          this.router.navigateByUrl('/dashboard/admin');
        } else if (datosUsuario.role == 2 && datosUsuario.verificado == 1) {
          this.router.navigateByUrl('/dashboard/cliente');
        } else if (datosUsuario.role == 2 && datosUsuario.verificado == 0) {
          sessionStorage.removeItem('usuario');
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Hola ${datosUsuario.nombre?.toUpperCase()},  para acceder a Fit & Healthy debe verificar su email. Se ha enviado un correo a la direccion de ${
              datosUsuario.email
            } `,
          }).then((result) => {
            if (result.isConfirmed) {
            this.authService.enviarVerificacionBis(email).subscribe(resp=>{
              console.log("enviar correo bis")
            })
            }
          })

          // this.router.navigateByUrl('/auth/login');
        } else {
          this.router.navigateByUrl('/dashboard/monitor');
        }
      } else {
        this.miFormulario.reset();
        this.datosIncorrectos = true;
        Swal.fire({
          icon: 'error',
          title: 'Error al intentar acceder a Fit & Healthy!',
          text:
            'El email y la contraseña que ingresaste no coinciden con nuestros registros. Por favor, revisa e inténtelo de nuevo.',
        });
      }
    });
  }
}
