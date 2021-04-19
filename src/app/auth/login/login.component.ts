import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: User = {
    email: '',
    password: '',
  };
  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  usuarios: any = [];

  ngOnInit(): void {
    // this.authService.getUsuarios().subscribe((usuarios) => {
    //   this.usuarios = usuarios;
    // });
  }

  login() {
    // this.authService
    //   .getUsuario(usuario)
    //   .subscribe((usuario) => console.log(usuario));
    this.usuario.email = this.miFormulario.get('email')?.value;
    this.usuario.password = this.miFormulario.get('password')?.value;

    this.authService.getUsuario(this.usuario).subscribe((resp) => {
      console.log(resp);
    });
  }
}
