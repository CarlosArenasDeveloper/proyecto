import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaNoticiasComponent } from './lista-noticias/lista-noticias.component';
import { AddNoticiaComponent } from './add-noticia/add-noticia.component';
import { EditNoticiaComponent } from './edit-noticia/edit-noticia.component';

const routes: Routes = [
  { path: '', component: ListaNoticiasComponent },
  { path: 'add-noticia', component: AddNoticiaComponent },
  { path: 'editar-noticia/:id', component: EditNoticiaComponent },
  { path: '**', redirectTo:'' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticiasRoutingModule { }
