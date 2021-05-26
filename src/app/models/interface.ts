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
  fecha_alta?: any;
  fecha_baja?: Date;
  num_reservas?: number;
  role?: any;
  estado?: string;
  verificado?: number;
  imagen?: string;

}

export interface Tarifa {
  id?: number;
  nombre?: string;
  descripcion?: string;
  precio?: number;
}

export interface Centro {
  id?: number;
  nombre?: string;
  direccion?: string;
  telefono?: number;
  latitud?:number;
  longitud?:number;
  ubicacion?:string;
}

export interface Musculo {
  nombre?: string;
  descripcion?: string;
  imagen?: string;
}

export interface Ejercicio {
  id?: number;
  nombre?: string;
  nombre_musculo?: string;
  nivel?: string;
  equipo?: string;
  tipo?: string;
  descripcion?: string;
  imagen?: string;
  video?:string;
}

export interface Actividad {
  id?: number;
  email_monitor?: string;
  id_tarifa?: number;
  nombre?: string;
  descripcion?: string;
  duracion?: number;
  imagen?: string;

}

export interface Sala {
  id?: number;
  aforo?: number;
}

export interface Sesion {
  id?: number;
  id_sala?: number;
  id_actividad?:number;
  fecha?: any;
  hora?: Date;
  num_clientes?: number;
  estado?: string;
  horarios?:Horario
}

export interface Horario{
  sala?:number;
  hora?:number;
  inicio?:string;
  fin?:string,
}

export interface Noticia {
  id?: number;
  email_usuario?: string;
  titulo?: string;
  cuerpo?: string;
  id_categoria?: number;
  visible?: any;
  fecha?: any;
  fecha_edit?: any;
  imagen?: string;
  video?:string;
}

export interface Categoria {
  id?: number;
  nombre?: string;
}

export interface PasswordPerfil{
  email?:string;
  passwordactual?:string;
  password?:string;
  password2?:string;
}

export interface Grafica{
  altas?:number;
  bajas?:number;
}