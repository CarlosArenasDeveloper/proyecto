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
  fecha_baja?: Date;
  num_reservas?: number;
  role?: any;
  estado?: string;
  verificado?: number;
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
}

export interface Sala {
  id?: number;
  aforo?: number;
  id_actividad?: number;
}

export interface Sesion {
  id?: number;
  id_sala?: number;
  fecha?: Date;
  hora?: Date;
  num_clientes?: number;
  estado?: string;
}

export interface Noticia {
  id?: number;
  email_usuario?: string;
  titulo?: string;
  cuerpo?: string;
  id_categoria?: number;
  visible?: boolean;
  fecha?: Date;
  fecha_edit?: Date;
  imagen?: string;
  video?:string;
}

export interface Categoria {
  id?: number;
  nombre?: string;
}
