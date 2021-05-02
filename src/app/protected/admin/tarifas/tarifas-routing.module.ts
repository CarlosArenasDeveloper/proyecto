import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaTarifasComponent } from './lista-tarifas/lista-tarifas.component';
import { AddTarifaComponent } from './add-tarifa/add-tarifa.component';
import { EditTarifaComponent } from './edit-tarifa/edit-tarifa.component';

const routes: Routes = [
  { path: '', component: ListaTarifasComponent },
  { path: 'add-tarifa', component: AddTarifaComponent },
  { path: 'editar-tarifa/:id', component: EditTarifaComponent },
  { path: '**', redirectTo:'' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarifasRoutingModule {}
