import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Asignatura, AsignaturaAsociada, ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-ramos',
  templateUrl: './ramos.page.html',
  styleUrls: ['./ramos.page.scss'],
})
export class RamosPage implements OnInit {
  materias: any;
  materia = new AsignaturaAsociada;
  profesor = new Asignatura();
  n: number;
  idN: String;
  usuario;
  uno: number


  constructor(private servicioMateria: ServiciosService, private router: Router, private alertcontroller : AlertController) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("listadoObjetos"));
    this.n = this.usuario.materias;
    this.servicioMateria.getMateriasProfesor().subscribe(
    (response) => { this.materias = response;}
    )
  }

  async anadirMateria(idNumber){
    if(this.n > 0){
      if(this.usuario.tipo == "Alumno"){
        this.idN = idNumber;
        this.uno = idNumber -1;
        this.materia.idAsignatura = this.idN.toString();
        this.materia.runAlumno = this.usuario.run;
        this.materia.nombreAlumno = this.usuario.nombre + " " + this.usuario.apellido;
        this.materia.nombreProfesor = this.materias[this.uno].docente;
        this.materia.asignatura = this.materias[this.uno].nombreAsignatura + " " + this.materias[this.uno].seccion;
        this.materia.rutaImg = this.materias[this.uno].rutaImg;
        this.servicioMateria.createMateria(this.materia).subscribe(
          ()=>{console.log("Materia Asociada");console.log(this.materias[this.uno].seccion);}
        );
        this.n = this.n - 1;
          if(this.n == 0){
            this.router.navigate(['/index']);
            const mensaje = await this.alertcontroller.create({
              header: 'Registro',
              subHeader: 'Asignaturas',
              message: 'El registro de asignaturas ha sido exitoso',
              buttons: ['OK'],
            });
            await mensaje.present();}
          }
          else if(this.usuario.tipo == "Profesor"){
            this.idN = idNumber;
            this.uno = idNumber -1;
            this.profesor.id = this.uno;
            this.profesor.nombreAsignatura = this.materias[this.uno].nombreAsignatura;
            this.profesor.seccion = this.materias[this.uno].seccion;
            this.profesor.docente = this.usuario.nombre + " " + this.usuario.apellido;
            this.profesor.capacidad = this.materias[this.uno].capacidad;
            this.profesor.rutaImg = this.materias[this.uno].rutaImg;
            this.profesor.runProfesor = this.usuario.run;
            if(this.materias[this.uno].docente != ""){
              const mensaje = await this.alertcontroller.create({
                header: 'Registro',
                subHeader: 'Asignaturas',
                message: 'Un profesor no se puede registrar en la asignatura de otro profesor',
                buttons: ['OK'],
              });
              await mensaje.present();
            }
            else{this.servicioMateria.updateEmpleado(idNumber,this.profesor).subscribe(
              (response)=>{console.log("Actualizado...")},
              (error)=>{console.log("Error al actualizar...")}
            );
            this.n = this.n - 1;
            if(this.n == 0){
              this.router.navigate(['/index']);
              const mensaje = await this.alertcontroller.create({
                header: 'Registro',
                subHeader: 'Asignatura',
                message: 'El registro de asignaturas ha sido exitoso',
                buttons: ['OK'],
              });
              await mensaje.present();}
              const mensaje = await this.alertcontroller.create({
                header: 'Registro',
                subHeader: 'Materias',
                message: 'Se ha registrado correctamente en la asignatura: ' + this.profesor.nombreAsignatura,
                buttons: ['OK'],
              });
              await mensaje.present();
            }
        }
      }
    }


}
