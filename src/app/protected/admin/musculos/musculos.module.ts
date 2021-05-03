import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusculosRoutingModule } from './musculos-routing.module';
import { AddMusculoComponent } from './add-musculo/add-musculo.component';
import { EditMusculoComponent } from './edit-musculo/edit-musculo.component';
import { ListaMusculosComponent } from './lista-musculos/lista-musculos.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [AddMusculoComponent, EditMusculoComponent, ListaMusculosComponent],
  imports: [
    CommonModule,
    MusculosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTablesModule,
  ]
})
export class MusculosModule { }
