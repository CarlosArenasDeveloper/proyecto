import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PasswordOlvidadaComponent } from './pages/password-olvidada/password-olvidada.component';
import { ReestablecerPasswordComponent } from './pages/reestablecer-password/reestablecer-password.component';
import { ActividadesPorTarifaComponent } from './pages/actividades-por-tarifa/actividades-por-tarifa.component';
import { SolicitudAltaComponent } from './pages/solicitud-alta/solicitud-alta.component';
import { ReRegistrerComponent } from './pages/re-registrer/re-registrer.component';

const routes: Routes = [

  {
    path: '',
    children: [
      { path: 'registro', component: RegistroComponent },
      { path: 'registro/actividades', component: ActividadesPorTarifaComponent },
      { path: 'login', component: LoginComponent },
      { path: 'passwordOlvidada', component: PasswordOlvidadaComponent },
      { path: 're-register', component: ReRegistrerComponent },
      { path: 'reestablecerPassword/:email', component: ReestablecerPasswordComponent },
      { path: 'solicitudAlta/:email', component: SolicitudAltaComponent },
      { path: '**', redirectTo: 'login' },
    ]
  }


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
