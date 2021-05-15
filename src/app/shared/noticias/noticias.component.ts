import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from '../../protected/services/admin.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  
  
  noticias: any = [];
  constructor(private adminService :AdminService) { }

  ngOnInit(): void {
    this.adminService.getNoticiasVisibles().subscribe((noticias) => {
      this.noticias = noticias;
      console.log(this.noticias);
    });
  }

  
  sesion(): boolean {
    if (sessionStorage.getItem('usuario')) {
      return true;
    }
    return false;
  }

}
