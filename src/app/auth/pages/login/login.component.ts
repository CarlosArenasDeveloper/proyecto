import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  datosIncorrectos: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  miFormulario: FormGroup = this.fb.group({
    email: [
      'carlos_arenas_99@hotmail.com',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: ['carlos', [Validators.required, Validators.minLength(6)]],
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
    }
    const { email, password } = this.miFormulario.value;
    this.authService.login(email, password).subscribe((datosUsuario) => {
      if (datosUsuario != 'error') {
        sessionStorage.setItem('usuario', JSON.stringify(datosUsuario));
        if (datosUsuario.role == 1) {
          this.router.navigateByUrl('/dashboard/admin');
        } else if (datosUsuario.role == 2) {
          this.router.navigateByUrl('/dashboard/cliente');
        } else {
          this.router.navigateByUrl('/dashboard/monitor');
        }
      } else {
        this.miFormulario.reset();
        this.datosIncorrectos = true;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text:
            'El nombre de usuario y la contraseña que ingresaste no coinciden con nuestros registros. Por favor, revisa e inténtelo de nuevo.',
        });
      }
    });
  }
}
