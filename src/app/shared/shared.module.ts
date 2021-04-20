import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NavegacionComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    NavegacionComponent
  ]
})
export class SharedModule { }
