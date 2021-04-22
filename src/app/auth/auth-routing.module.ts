import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { MainComponent } from './pages/main/main.component';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [

  {
    path: '',
    children: [
      { path: 'main', component: MainComponent },
      { path: 'main/registro', component: RegistroComponent },
      { path: 'main/login', component: LoginComponent },
      { path: 'main/logout', component: LogoutComponent },
      { path: '**', redirectTo: 'main' },
    ]
  }


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
