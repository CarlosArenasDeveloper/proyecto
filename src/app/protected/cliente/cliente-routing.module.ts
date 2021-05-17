import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente.component';
import { EditarPerfilComponent } from '../../shared/editar-perfil/editar-perfil.component';

const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
  },
  {
    path:'editar-perfil/:email',
    component: EditarPerfilComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
