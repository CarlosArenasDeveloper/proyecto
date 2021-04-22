export interface Usuario {
  email: string;
  password: string;
}

export interface Cliente {
  dni: string;
  password: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  fecha_nac: Date;
  genero: string;
  email: string;
  telefono: number;
  cuenta_bancaria: string;
  ciudad: string;
  direccion: string;
  cod_postal: number;
  id_tarifa: number;
  id_centro: number;
}
