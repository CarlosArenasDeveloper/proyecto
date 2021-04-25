import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Usuario } from '../../../auth/interfaces/interface';

@Component({
  selector: 'app-altacliente',
  templateUrl: './altacliente.component.html',
  styleUrls: ['./altacliente.component.css']
})
export class AltaclienteComponent implements OnInit {

 
  cliente: Usuario = {
    dni: '',
    password: '',
    nombre: '',
    apellido1: '',
    apellido2: '',
    fecha_nac: new Date(),
    sexo: '',
    email: '',
    telefono: 1,
    cuenta_bancaria: '',
    ciudad: '',
    direccion: '',
    cod_postal: 1,
    id_tarifa: 1,
    id_centro: 1,
  };

  constructor(private fb: FormBuilder, private authservice: AuthService, private router: Router,
    ) {}

  miFormulario: FormGroup = this.fb.group({
    dni: ['', [Validators.required]],
    password: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    apellido1: ['', [Validators.required]],
    apellido2: ['', [Validators.required]],
    fecha_nac: ['', [Validators.required]],
    genero: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required]],
    cuenta_bancaria: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    cod_postal: ['', [Validators.required]],
    id_tarifa: ['', [Validators.required]],
    id_centro: ['', [Validators.required]],
  });

  ngOnInit(): void {}

  registrar(){
    this.cliente=this.miFormulario.value;
    this.authservice.registro(this.cliente).subscribe(resp=>{
      if(resp!='ERROR'){
          this.router.navigateByUrl('/dashboard/admin')
      }
    })
  }
}
