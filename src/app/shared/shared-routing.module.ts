import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticiasComponent } from './noticias/noticias.component';
import { InicioComponent } from './inicio/inicio.component';
import { CentrosComponent } from './centros/centros.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { TarifasComponent } from './tarifas/tarifas.component';

const routes: Routes = [
  {
    path:'',
    component: InicioComponent
  },
  {
    path: 'noticias',
    component: NoticiasComponent,
  },
  {
    path:'centros',
    component: CentrosComponent
  },
  {
    path:'actividades',
    component: ActividadesComponent
  },
  {
    path:'tarifas',
    component: TarifasComponent
  },
  {
    path:'**',
    redirectTo:''
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
