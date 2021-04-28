import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-password-olvidada',
  templateUrl: './password-olvidada.component.html',
  styleUrls: ['./password-olvidada.component.css']
})
export class PasswordOlvidadaComponent  {

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

  enviar(){
    this.authService.passwordOlvidada(this.miFormulario.controls['email'].value).subscribe(resp=>{
      console.log(resp);
    })
  }

}
