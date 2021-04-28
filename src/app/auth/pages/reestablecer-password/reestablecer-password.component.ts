import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidatorService } from '../../services/validator.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-reestablecer-password',
  templateUrl: './reestablecer-password.component.html',
  styleUrls: ['./reestablecer-password.component.css'],
})
export class ReestablecerPasswordComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private validatorService: ValidatorService,
    private activatedRoute: ActivatedRoute,

  ) {}
  miFormulario: FormGroup = this.fb.group(
    {
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorService.camposIguales('password', 'password2'),
      ],
    }
  );

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  get passwordErrorMsg(): string {
    const errors = this.miFormulario.get('password')?.errors;
    if (errors?.required) {
      return 'La contraseña es requerida';
    } else if (errors?.minlength) {
      return 'La contraseña debe tener mas de 6 caracteres';
    }
    return '';
  }
  actualizarPassword(){
    this.activatedRoute.params
    .pipe(
      switchMap(({ email }) => this.authService.reestablecerPassword({email:email,password:this.miFormulario.controls['password'].value}))
    )
    .subscribe(resp=>{
      console.log(resp);
    })
  }
}
