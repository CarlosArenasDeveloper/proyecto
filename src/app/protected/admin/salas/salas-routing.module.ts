import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaSalasComponent } from './lista-salas/lista-salas.component';
import { AddSalaComponent } from './add-sala/add-sala.component';
import { EditSalaComponent } from './edit-sala/edit-sala.component';

const routes: Routes = [
  { path: '', component: ListaSalasComponent },
  { path: 'add-sala', component: AddSalaComponent },
  { path: 'editar-sala/:id', component: EditSalaComponent },
  { path: '**', redirectTo:'' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalasRoutingModule { }
