import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaActividadesComponent } from './lista-actividades/lista-actividades.component';
import { AddActividadComponent } from './add-actividad/add-actividad.component';
import { EditActividadComponent } from './edit-actividad/edit-actividad.component';

const routes: Routes = [
  { path: '', component: ListaActividadesComponent },
  { path: 'add-actividad', component: AddActividadComponent },
  { path: 'editar-actividad/:id', component: EditActividadComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadesRoutingModule {}
