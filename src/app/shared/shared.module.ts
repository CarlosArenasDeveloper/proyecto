import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [NavegacionComponent],
  imports: [
    CommonModule,
    RouterModule, MaterialModule ],
  exports:[
    NavegacionComponent
  ]
})
export class SharedModule { }
