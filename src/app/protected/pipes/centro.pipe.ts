import { Pipe, PipeTransform } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Pipe({
  name: 'centro',
})
export class CentroPipe implements PipeTransform {
  constructor(private adminService: AdminService) {}
  transform(id: number): any {
    //   this.adminService.getCentro(id).subscribe((resp) => {
    //     console.log(resp);
    //   });
    //   return "";
    // }
    // console.log((this.adminService.getCentro(id)));
    //   return JSON.stringify(this.adminService.getCentro(id))
    //   }
  }
}
