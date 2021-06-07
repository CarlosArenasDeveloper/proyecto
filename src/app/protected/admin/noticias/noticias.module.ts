import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticiasRoutingModule } from './noticias-routing.module';
import { ListaNoticiasComponent } from './lista-noticias/lista-noticias.component';
import { EditNoticiaComponent } from './edit-noticia/edit-noticia.component';
import { AddNoticiaComponent } from './add-noticia/add-noticia.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { DataTablesModule } from 'angular-datatables';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ListaNoticiasComponent,
    EditNoticiaComponent,
    AddNoticiaComponent,
  ],
  imports: [
    CommonModule,
    NoticiasRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTablesModule,
    TranslateModule  
  ],
  exports: [ListaNoticiasComponent, EditNoticiaComponent, AddNoticiaComponent],
})
export class NoticiasModule {}
