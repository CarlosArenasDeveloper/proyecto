import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rol',
})
export class RolPipe implements PipeTransform {

  transform(id_rol: number): string {
    if (id_rol == 1) {
      return 'Administrador';
    }else if (id_rol == 2) {
      return 'Cliente';
    }
    return 'Monitor'
  
  }
}
