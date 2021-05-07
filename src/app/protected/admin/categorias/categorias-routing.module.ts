import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';
import { AddCategoriaComponent } from './add-categoria/add-categoria.component';

const routes: Routes = [
  { path: '', component: ListaCategoriasComponent },
  { path: 'add-categoria', component: AddCategoriaComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasRoutingModule {}
