import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';





@NgModule({
  exports: [MatFormFieldModule,MatSelectModule,MatInputModule,MatToolbarModule,MatIconModule,MatButtonModule],
})
export class MaterialModule {}
