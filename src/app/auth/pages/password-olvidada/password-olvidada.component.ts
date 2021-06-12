import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../../protected/services/admin.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-password-olvidada',
  templateUrl: './password-olvidada.component.html',
  styleUrls: ['./password-olvidada.component.css']
})
export class PasswordOlvidadaComponent implements OnInit {

  datosIncorrectos: boolean = false;
  usuario!:Usuario;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private adminService: AdminService,
    private translateService:TranslateService
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
      return this.translateService.instant('El email es obligatorio');
    } else if (errors?.pattern) {
      return this.translateService.instant(
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

  enviar(){
    this.adminService.getUsuarioPorEmail(this.miFormulario.controls['email'].value).subscribe(resp=>{
      if(resp!="error"){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${this.translateService.instant('Se ha enviado un correo a')} ${this.miFormulario.controls['email'].value} ${this.translateService.instant('para reestablecer la contraseña.')}` ,
          showConfirmButton: false,
          timer: 3000,
        });
        this.authService.passwordOlvidada(this.miFormulario.controls['email'].value).subscribe(resp=>{
     
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: `${this.translateService.instant('Email no registrado')}`,
          text:
            `${this.translateService.instant('El email que ingresaste no coincide con nuestros registros. Por favor, revisa e inténtelo de nuevo.')}`,
        });
      }
    })

  }


}
