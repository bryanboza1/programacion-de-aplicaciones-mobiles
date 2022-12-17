import { Component, OnInit } from '@angular/core';

import { Router, Routes } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { MenuController } from '@ionic/angular';

import { Animation, AnimationController } from '@ionic/angular';

import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  handlerMessage = '';
  roleMessage = '';


  listado = [];
  materias;
  AsignaturaAsociada;
  usuario;
  n: number=0;
  id: number;
  constructor(private router: Router ,private menu: MenuController, private alertController: AlertController, private anime: AnimationController, private servicioPersona: ServiciosService) { }

  async ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("listadoObjetos"));
    if(this.usuario.tipo == "Alumno"){
      this.servicioPersona.getMateriasAlumno().subscribe(
        (response) => { this.materias = response;
        this.id = response.length;
        for (this.n; this.n < this.id; this.n++) {
          if(this.materias[this.n].runAlumno==this.usuario.run){
            this.listado.push(this.materias[this.n]);
            let listadoJson = JSON.stringify(this.listado);
            localStorage.setItem("listadoCursos", listadoJson);
          }else{
          }
        }
        this.AsignaturaAsociada = JSON.parse(localStorage.getItem("listadoCursos"));
        });
    }
    else if(this.usuario.tipo == "Profesor"){
      this.servicioPersona.getMateriasProfesor().subscribe((res)=>{
        this.materias = res;
        this.id = res.length;
        for (this.n; this.n < this.id; this.n++) {
          if(this.materias[this.n].runProfesor==this.usuario.run){
            this.listado.push(this.materias[this.n]);
            let listadoJson = JSON.stringify(this.listado);
            localStorage.setItem("listadoCursos", listadoJson);}else{
            }
          }
          this.AsignaturaAsociada = JSON.parse(localStorage.getItem("listadoCursos"));
      });
    }

  }


}
