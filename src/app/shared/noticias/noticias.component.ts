import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../protected/services/admin.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
})
export class NoticiasComponent implements OnInit {
  // ELEMENT_DATA:any = [];
  // dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  noticias: any = [];
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getNoticiasVisibles().subscribe((noticias) => {
      this.noticias = noticias;
      // this.ELEMENT_DATA=noticias
    });
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  sesion(): boolean {
    if (sessionStorage.getItem('usuario')) {
      return true;
    }
    return false;
  }
}
