import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCentrosComponent } from './lista-centros/lista-centros.component';
import { AddCentroComponent } from './add-centro/add-centro.component';
import { EditCentroComponent } from './edit-centro/edit-centro.component';

const routes: Routes = [
  {path:'', component: ListaCentrosComponent},
  { path: 'add-centro', component: AddCentroComponent },
  { path: 'editar-centro/:id', component: EditCentroComponent },
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentrosRoutingModule { }
