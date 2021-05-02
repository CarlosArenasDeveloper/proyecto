import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentrosRoutingModule } from './centros-routing.module';
import { ListaCentrosComponent } from './lista-centros/lista-centros.component';
import { AddCentroComponent } from './add-centro/add-centro.component';
import { EditCentroComponent } from './edit-centro/edit-centro.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [ListaCentrosComponent, AddCentroComponent, EditCentroComponent],
  imports: [
    CommonModule,
    CentrosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTablesModule,
  ],
  exports:[
    ListaCentrosComponent, AddCentroComponent, EditCentroComponent
  ]
})
export class CentrosModule { }
