import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalasRoutingModule } from './salas-routing.module';
import { ListaSalasComponent } from './lista-salas/lista-salas.component';
import { AddSalaComponent } from './add-sala/add-sala.component';
import { EditSalaComponent } from './edit-sala/edit-sala.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { DataTablesModule } from 'angular-datatables';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ListaSalasComponent, AddSalaComponent, EditSalaComponent],
  imports: [
    CommonModule,
    SalasRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTablesModule,
    FormsModule,
    TranslateModule
  ],
  exports:[ListaSalasComponent, AddSalaComponent, EditSalaComponent]
})
export class SalasModule { }
