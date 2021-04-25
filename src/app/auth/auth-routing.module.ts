import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [

  {
    path: '',
    children: [
      { path: 'registro', component: RegistroComponent },
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },
      { path: '**', redirectTo: 'login' },
    ]
  }


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
