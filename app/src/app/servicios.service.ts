import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


export class Persona {
  _id: number;
  nombre: string;
  nombre2: string;
  apellido: string;
  apellido2: string;
  run: string;
  email: string;
  pass: string;
  tipo: string;
  materias: number;
}
export class Asignatura {
  id: number;
  nombreAsignatura: String;
  seccion:String;
  runProfesor: String;
  docente: String;
  capacidad: number;
  rutaImg: string;
}
export class AsignaturaAsociada {
  id: number;
  idAsignatura: String;
  runAlumno: String;
  nombreAlumno: String;
  nombreProfesor: String;
  asignatura: String;
  rutaImg:String;
}
export class asistencia{
  fecha: string;
  asistencia: string;
  idusuario: string;
  materiaid:string;
}


@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private objectSource = new BehaviorSubject<{}>({});
  private listSource = new BehaviorSubject<any[]>([]);

  $getObjectSource = this.objectSource.asObservable();
  $getListSource = this.listSource.asObservable();
  endpoint = 'http://localhost:3000/personas';
  endpointAsignaturas = 'http://localhost:3000/materias';
  endpointAsignaturasAsociada = 'http://localhost:3000/materiaAsociada';
  endpointasistencia = 'http://localhost:3000/asistencia';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  // Obtener Personas -- login
  getPersonas(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(this.endpoint);
  }

  // getById -- NO USADO
  getPersona(id): Observable<Persona> { 
    return this.httpClient.get<Persona>(this.endpoint + '/' + id);
  }

  // Agregar -- register page
  createPersona(persona: Persona): Observable<any> {
    return this.httpClient.post<Persona>(this.endpoint, 
                                         JSON.stringify(persona), 
                                         this.httpOptions);
  }

crearasistencia(newasistencia:asistencia): Observable<asistencia> { 
  return this.httpClient.post<asistencia>(this.endpointasistencia,newasistencia)
}

  // edit --
  updateUser(id, persona: Persona): Observable<any> {
    return this.httpClient.put(this.endpoint + '/' + id, JSON.stringify(persona), this.httpOptions)
  }

  // delete -- NO USADO
  deleteUser(id): Observable<Persona[]> {
    return this.httpClient.delete<Persona[]>(this.endpoint + '/' + id, this.httpOptions)
  }


  // --------------------------- ASGINATURA ------------------------------

  //Ver materias Profesor
  getMateriasProfesor(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(this.endpointAsignaturas);
  }
  //Ver materias Alumnno
  getMateriasAlumno(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(this.endpointAsignaturasAsociada);
  }
  //Ver una materia
  getMateriaAlumno(id): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(this.endpointAsignaturasAsociada + '/' + id);
  }
  //Actualizar materia
  updateEmpleado(id, asignatura: Asignatura): Observable<any> {
    return this.httpClient.put(this.endpointAsignaturas + '/' +
                               id, JSON.stringify(asignatura),
                                this.httpOptions);
  }

  //Crear una materia
  createMateria(asignatura: AsignaturaAsociada): Observable<any> {
    return this.httpClient.post<AsignaturaAsociada>(this.endpointAsignaturasAsociada,
                                                   JSON.stringify(asignatura),
                                                    this.httpOptions);
  }

  sendobjectsource(data:any){
    this.objectSource.next(data);
  }
}
