import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tarifa'
})
export class TarifaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
