import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMusculosComponent } from './lista-musculos/lista-musculos.component';
import { AddMusculoComponent } from './add-musculo/add-musculo.component';
import { EditMusculoComponent } from './edit-musculo/edit-musculo.component';

const routes: Routes = [
  { path: '', component: ListaMusculosComponent },
  { path: 'add-musculo', component: AddMusculoComponent },
  { path: 'editar-musculo/:nombre', component: EditMusculoComponent },
  { path: '**', redirectTo:''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusculosRoutingModule { }
