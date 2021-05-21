import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  Tarifa,
  Usuario,
  Centro,
  Musculo,
  Ejercicio,
  Noticia,
  Categoria,
} from '../../models/interface';
import { Observable } from 'rxjs';
import {
  Actividad,
  Sesion,
  Sala,
  PasswordPerfil,
} from '../../models/interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl: string = environment.baseUrl;

  constructor(private htpp: HttpClient) {}

  getClientes(): Observable<Usuario> {
    return this.htpp.get(`${this.baseUrl}/selectClientes.php`);
  }

  getMonitores() {
    return this.htpp.get(`${this.baseUrl}/selectMonitores.php`);
  }

  getUsuarioPorEmail(email: string): Observable<Usuario> {
    return this.htpp.get<Usuario>(
      `${this.baseUrl}/seleccionarUsuario.php?email=${email}`
    );
  }

  borrarUsuario(email: string) {
    return this.htpp.get<Usuario>(
      `${this.baseUrl}/borrarUsuario.php?email=${email}`
    );
  }

  borrarMonitor(email: string) {
    return this.htpp.get<Usuario>(
      `${this.baseUrl}/borrarMonitor.php?email=${email}`
    );
  }

  editarCliente(cliente: Usuario) {
    return this.htpp.post<Usuario>(
      `${this.baseUrl}/editarCliente.php`,
      JSON.stringify(cliente)
    );
  }

  editarMonitor(monitor: Usuario) {
    return this.htpp.post<Usuario>(
      `${this.baseUrl}/editarMonitor.php`,
      JSON.stringify(monitor)
    );
  }

  darBaja(cliente: Usuario) {
    return this.htpp.post<Usuario>(
      `${this.baseUrl}/darBaja.php`,
      JSON.stringify(cliente)
    );
  }
  darAlta(cliente: Usuario) {
    return this.htpp.post<Usuario>(
      `${this.baseUrl}/darAlta.php`,
      JSON.stringify(cliente)
    );
  }

  addMonitor(usuario: Usuario): Observable<Usuario> {
    return this.htpp.post(
      `${this.baseUrl}/addMonitor.php`,
      JSON.stringify(usuario)
    );
  }
  addCliente(usuario: Usuario): Observable<Usuario> {
    return this.htpp.post(
      `${this.baseUrl}/addCliente.php`,
      JSON.stringify(usuario)
    );
  }
  getNombresClientes() {
    return this.htpp.get(`${this.baseUrl}/nombres.php`);
  }

  getTarifas(): Observable<Tarifa> {
    return this.htpp.get(`${this.baseUrl}/selectTarifas.php`);
  }

  addTarifa(tarifa: Tarifa): Observable<Tarifa> {
    return this.htpp.post(
      `${this.baseUrl}/addTarifa.php`,
      JSON.stringify(tarifa)
    );
  }
  borrarTarifa(id: number) {
    return this.htpp.get<Tarifa>(`${this.baseUrl}/borrarTarifa.php?id=${id}`);
  }
  getTarifaPorId(id: number) {
    return this.htpp.get<Tarifa>(
      `${this.baseUrl}/seleccionarTarifa.php?id=${id}`
    );
  }
  editarTarifa(tarifa: Usuario) {
    return this.htpp.post(
      `${this.baseUrl}/editarTarifa.php`,
      JSON.stringify(tarifa)
    );
  }
  getCentros(): Observable<Centro> {
    return this.htpp.get(`${this.baseUrl}/selectCentros.php`);
  }

  addCentro(centro: Centro): Observable<Centro> {
    return this.htpp.post(
      `${this.baseUrl}/addCentro.php`,
      JSON.stringify(centro)
    );
  }

  borrarCentro(id: number) {
    return this.htpp.get<Tarifa>(`${this.baseUrl}/borrarCentro.php?id=${id}`);
  }

  getCentroPorId(id: number) {
    return this.htpp.get<Centro>(
      `${this.baseUrl}/seleccionarCentro.php?id=${id}`
    );
  }
  editarCentro(centro: Centro) {
    return this.htpp.post(
      `${this.baseUrl}/editarCentro.php`,
      JSON.stringify(centro)
    );
  }

  getMusculos(): Observable<Musculo> {
    return this.htpp.get(`${this.baseUrl}/selectMusculos.php`);
  }

  addMusculo(musculo: Musculo): Observable<Musculo> {
    return this.htpp.post(
      `${this.baseUrl}/addMusculo.php`,
      JSON.stringify(musculo)
    );
  }

  borrarMusculo(nombre: string) {
    return this.htpp.get<Musculo>(
      `${this.baseUrl}/borrarMusculo.php?nombre=${nombre}`
    );
  }

  getMusculoPorNombre(nombre: string) {
    return this.htpp.get<Musculo>(
      `${this.baseUrl}/seleccionarMusculo.php?nombre=${nombre}`
    );
  }
  editarMusculo(musculo: Musculo) {
    return this.htpp.post(
      `${this.baseUrl}/editarMusculo.php`,
      JSON.stringify(musculo)
    );
  }

  getEjercicios(): Observable<Ejercicio> {
    return this.htpp.get(`${this.baseUrl}/selectEjercicios.php`);
  }

  addEjercicio(ejercicio: Ejercicio): Observable<Ejercicio> {
    return this.htpp.post(
      `${this.baseUrl}/addEjercicio.php`,
      JSON.stringify(ejercicio)
    );
  }

  borrarEjercicio(id: number) {
    return this.htpp.get<Ejercicio>(
      `${this.baseUrl}/borrarEjercicio.php?id=${id}`
    );
  }

  getEjercicioPorId(id: number) {
    return this.htpp.get<Ejercicio>(
      `${this.baseUrl}/seleccionarEjercicio.php?id=${id}`
    );
  }
  editarEjercicio(ejercicio: Ejercicio) {
    return this.htpp.post(
      `${this.baseUrl}/editarEjercicio.php`,
      JSON.stringify(ejercicio)
    );
  }

  getNoticias(): Observable<Noticia> {
    return this.htpp.get(`${this.baseUrl}/selectNoticias.php`);
  }
  getNoticiasVisibles(): Observable<Noticia> {
    return this.htpp.get(`${this.baseUrl}/selectNoticiasVisibles.php`);
  }

  getNoticiasRelacionadas(
    nombre: any,
    id_noticia: number
  ): Observable<Noticia> {
    return this.htpp.get(
      `${this.baseUrl}/selectNoticiasRelacionadas.php?nombre=${nombre}&id_noticia=${id_noticia}`
    );
  }
  addNoticia(noticia: Noticia): Observable<Noticia> {
    return this.htpp.post(
      `${this.baseUrl}/addNoticia.php`,
      JSON.stringify(noticia)
    );
  }

  borrarNoticia(id: number) {
    return this.htpp.get<Noticia>(`${this.baseUrl}/borrarNoticia.php?id=${id}`);
  }

  getNoticiaPorId(id: number) {
    return this.htpp.get<Noticia>(
      `${this.baseUrl}/seleccionarNoticia.php?id=${id}`
    );
  }

  getNoticiaPorIdInicio(id: number) {
    return this.htpp.get<Noticia>(
      `${this.baseUrl}/seleccionarNoticiaInicio.php?id=${id}`
    );
  }

  editarNoticia(noticia: Noticia) {
    return this.htpp.post(
      `${this.baseUrl}/editarNoticia.php`,
      JSON.stringify(noticia)
    );
  }

  getCategorias(): Observable<Categoria> {
    return this.htpp.get(`${this.baseUrl}/selectCategorias.php`);
  }

  getEditores(): Observable<Usuario> {
    return this.htpp.get(`${this.baseUrl}/selectEditores.php`);
  }

  addCategoria(nombre: string): Observable<Categoria> {
    return this.htpp.get(`${this.baseUrl}/addCategoria.php?nombre=${nombre}`);
  }

  borrarCategoria(id: number) {
    return this.htpp.get<Categoria>(
      `${this.baseUrl}/borrarCategoria.php?id=${id}`
    );
  }

  getUsuariosGym(id: number) {
    return this.htpp.get(`${this.baseUrl}/verUsuariosGym.php?id=${id}`);
  }

  getActividades(): Observable<Actividad> {
    return this.htpp.get(`${this.baseUrl}/selectActividades.php`);
  }

  addActividad(actividad: Actividad): Observable<Actividad> {
    return this.htpp.post(
      `${this.baseUrl}/addActividad.php`,
      JSON.stringify(actividad)
    );
  }

  borrarActividad(id: number) {
    return this.htpp.get<Actividad>(
      `${this.baseUrl}/borrarActividad.php?id=${id}`
    );
  }

  getActividadPorId(id: number) {
    return this.htpp.get<Actividad>(
      `${this.baseUrl}/seleccionarActividad.php?id=${id}`
    );
  }

  getActividadPorIdInicio(id: number) {
    return this.htpp.get<Actividad>(
      `${this.baseUrl}/seleccionarActividadInicio.php?id=${id}`
    );
  }
  editarActividad(actividad: Actividad) {
    return this.htpp.post(
      `${this.baseUrl}/editarActividad.php`,
      JSON.stringify(actividad)
    );
  }

  getSesiones(): Observable<Sesion> {
    return this.htpp.get(`${this.baseUrl}/selectSesiones.php`);
  }

  addSesion(sesion: Sesion): Observable<Sesion> {
    return this.htpp.post(
      `${this.baseUrl}/addSesion.php`,
      JSON.stringify(sesion)
    );
  }

  borrarSesion(id: number) {
    return this.htpp.get<Sesion>(`${this.baseUrl}/borrarSesion.php?id=${id}`);
  }

  getSesionPorId(id: number) {
    return this.htpp.get<Sesion>(
      `${this.baseUrl}/seleccionarSesion.php?id=${id}`
    );
  }
  editarSesion(sesion: Sesion) {
    return this.htpp.post(
      `${this.baseUrl}/editarSesion.php`,
      JSON.stringify(sesion)
    );
  }

  getSalas(): Observable<Sala> {
    return this.htpp.get(`${this.baseUrl}/selectSalas.php`);
  }

  addSala(sala: Sala): Observable<Sala> {
    return this.htpp.post(`${this.baseUrl}/addSala.php`, JSON.stringify(sala));
  }

  borrarSala(id: number) {
    return this.htpp.get<Sala>(`${this.baseUrl}/borrarSala.php?id=${id}`);
  }

  getSalaPorId(id: number) {
    return this.htpp.get<Sala>(`${this.baseUrl}/seleccionarSala.php?id=${id}`);
  }
  editarSala(sala: Sala) {
    return this.htpp.post(
      `${this.baseUrl}/editarSala.php`,
      JSON.stringify(sala)
    );
  }

  editarAdmin(admin: Usuario) {
    return this.htpp.post<Usuario>(
      `${this.baseUrl}/editarAdmin.php`,
      JSON.stringify(admin)
    );
  }

  actualizarPassPerfil(passwordPerfil: PasswordPerfil) {
    return this.htpp.post<PasswordPerfil>(
      `${this.baseUrl}/actualizarPassPerfil.php`,
      JSON.stringify(passwordPerfil)
    );
  }

  getActividadesPorTarifa(id_tarifa: number) {
    return this.htpp.get(
      `${this.baseUrl}/selectActividadesPorTarifa.php?id_tarifa=${id_tarifa}`
    );
  }

  getEjerciciosPorMusculo(nombre_musculo: string) {
    return this.htpp.get(
      `${this.baseUrl}/selectEjerciciosPorMusculo.php?nombre_musculo=${nombre_musculo}`
    );
  }

  getGraficaSexo() {
    return this.htpp.get(`${this.baseUrl}/graficaSexo.php`);
  }

  getGraficaUsuariosPorGym() {
    return this.htpp.get(`${this.baseUrl}/graficaCentros.php`);
  }

  getGraficaSexoMonitores() {
    return this.htpp.get(`${this.baseUrl}/graficaSexoMonitores.php`);
  }

  getGraficaSexoPorGimnasio(id_centro: number) {
    return this.htpp.get(
      `${this.baseUrl}/graficaSexoPorGimnasio.php?id_centro=${id_centro}`
    );
  }

  getGraficaSexoMonitoresPorGimnasio(id_centro: number) {
    return this.htpp.get(
      `${this.baseUrl}/graficaSexoMonitoresPorGimnasio.php?id_centro=${id_centro}`
    );
  }
  getGraficaMonitoresPorGym() {
    return this.htpp.get(`${this.baseUrl}/graficaCentrosMonitores.php`);
  }
  getGraficaClientesFecha(mes: number, anio: number) {
    return this.htpp.get(
      `${this.baseUrl}/graficaClientesFecha.php?mes=${mes}&anio=${anio}`
    );
  }
  getGraficaClientesFechaBis(anio: number) {
    return this.htpp.get(
      `${this.baseUrl}/graficaPrueba.php?anio=${anio}`
    );
  }
}
