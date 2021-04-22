import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl: string = environment.baseUrl;

  constructor(private htpp: HttpClient) {}

  getClientes() {
    return this.htpp.get(`${this.baseUrl}/index.php`);
  }
}
