import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../auth/interfaces/interface';
import { switchMap } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editcliente',
  templateUrl: './editcliente.component.html',
  styleUrls: ['./editcliente.component.css'],
})
export class EditclienteComponent implements OnInit {
  cliente: Usuario = {
    dni: '',
    password: '',
    nombre: '',
    apellido1: '',
    apellido2: '',
    fecha_nac: new Date(),
    sexo: '',
    telefono: 1,
    cuenta_bancaria: '',
    ciudad: '',
    direccion: '',
    cod_postal: 1,
    id_tarifa: 1,
    id_centro: 1,
  };
  miFormulario: FormGroup = this.fb.group({
    dni: ['', [Validators.required]],
    password: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    apellido1: ['', [Validators.required]],
    apellido2: ['', [Validators.required]],
    fecha_nac: ['', [Validators.required]],
    genero: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    cuenta_bancaria: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    cod_postal: ['', [Validators.required]],
    id_tarifa: ['', [Validators.required]],
    id_centro: ['', [Validators.required]],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ email }) => this.adminService.getClientePorEmail(email))
      )
      .subscribe(cliente=>{
        this.cliente=cliente;
        // this.miFormulario.controls['dni'].setValue(this.cliente.dni);
        // this.miFormulario.controls['password'].setValue(this.cliente.password);
        // this.miFormulario.controls['nombre'].setValue(this.cliente.nombre);
        // this.miFormulario.controls['apellido1'].setValue(this.cliente.apellido1);
        // this.miFormulario.controls['dni'].setValue(this.cliente.dni);
        // this.miFormulario.controls['dni'].setValue(this.cliente.dni);
        // this.miFormulario.controls['dni'].setValue(this.cliente.dni);
        // this.miFormulario.controls['dni'].setValue(this.cliente.dni);
        // this.miFormulario.controls['dni'].setValue(this.cliente.dni);
        // this.miFormulario.controls['dni'].setValue(this.cliente.dni);

        
        // console.log(cliente);
        // console.log(this.cliente);
        // console.log(this.miFormulario.value);
      })
  }
  editar() {
    // console.log(this.cliente);
    // console.log(this.miFormulario.value);
    // this.activatedRoute.params
    // .pipe(
    //   switchMap(({ email }) => this.adminService.editarCliente(email))
    // )
    // .subscribe(cliente=>{
    //   console.log(cliente);
    // })

    this.adminService.editarCliente(this.cliente).subscribe(resp=>console.log(resp))

  }
}
