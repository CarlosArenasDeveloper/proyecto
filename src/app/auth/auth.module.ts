import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordOlvidadaComponent } from './pages/password-olvidada/password-olvidada.component';
import { ReestablecerPasswordComponent } from './pages/reestablecer-password/reestablecer-password.component';
import { ActividadesPorTarifaComponent } from './pages/actividades-por-tarifa/actividades-por-tarifa.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LoginComponent, RegistroComponent, PasswordOlvidadaComponent, ReestablecerPasswordComponent, ActividadesPorTarifaComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPayPalModule,
    TranslateModule    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule { }
