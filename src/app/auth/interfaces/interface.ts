// export interface Usuario {
//   email: string;
//   password: string;
// }

export interface Usuario {
  dni?: string;
  password?: string;
  nombre?: string;
  apellido1?: string;
  apellido2?: string;
  fecha_nac?: Date;
  sexo?: string;
  email?: string;
  telefono?: number;
  cuenta_bancaria?: string;
  ciudad?: string;
  direccion?: string;
  cod_postal?: number;
  id_tarifa?: number;
  id_centro?: number;
  fecha_alta?: Date;
  fecha_baja?:Date,
  num_reservas?:number;
  role?:any;
  estado?: string;

}

export interface Tarifa{
  id?:number;
  nombre?:string;
  descripcion?:string;
  precio?:number;
}

export interface Centro{
  id?:number;
  nombre?:string;
  direccion?:string;
  telefono?:number;
}

