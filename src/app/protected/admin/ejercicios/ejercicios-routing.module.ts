import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEjerciciosComponent } from './lista-ejercicios/lista-ejercicios.component';
import { AddEjercicioComponent } from './add-ejercicio/add-ejercicio.component';
import { EditEjercicioComponent } from './edit-ejercicio/edit-ejercicio.component';

const routes: Routes = [
  { path: '', component: ListaEjerciciosComponent },
  { path: 'add-ejercicio', component: AddEjercicioComponent },
  { path: 'editar-ejercicio/:id', component: EditEjercicioComponent },
  { path: '**', redirectTo:'' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EjerciciosRoutingModule { }
