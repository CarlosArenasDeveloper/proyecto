import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './pages/logout/logout.component';
import { PasswordOlvidadaComponent } from './pages/password-olvidada/password-olvidada.component';
import { ReestablecerPasswordComponent } from './pages/reestablecer-password/reestablecer-password.component';


@NgModule({
  declarations: [LoginComponent, RegistroComponent, LogoutComponent, PasswordOlvidadaComponent, ReestablecerPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
