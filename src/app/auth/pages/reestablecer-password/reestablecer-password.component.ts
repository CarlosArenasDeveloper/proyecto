import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidatorService } from '../../services/validator.service';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';


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
    private translateService:TranslateService

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
      return this.translateService.instant('La contraseña es requerida');
    } else if (errors?.minlength) {
      return this.translateService.instant('La contraseña debe tener mas de 6 caracteres');
    }
    return '';
  }
  actualizarPassword(){
    this.activatedRoute.params
    .pipe(
      switchMap(({ email }) => this.authService.reestablecerPassword({email:email,password:this.miFormulario.controls['password'].value}))
    )
    .subscribe(resp=>{
      if(resp=='correcto'){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title:`${this.translateService.instant('Contraseña actualizada')}`,
          text: `${this.translateService.instant('Se ha cambiado la contraseña de acceso correctamente')}!` ,
          showConfirmButton: false,
          timer: 3000,
        });
        this.router.navigateByUrl('auth/login');

      }
    })
  }
}
