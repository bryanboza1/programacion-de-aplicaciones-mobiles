import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { MenuController, NavParams, ToastController } from '@ionic/angular';
import { ServicioService } from '../servicios/servicio.service';
import { ServiciosService } from '../servicios.service';



@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  nombre:any;
  listado = [];
  materias;
  constructor(private menu: MenuController,
              private servicio:ServicioService,
              private router : Router,
              private toastController : ToastController,) { 
  }

  ngOnInit() {
    this.servicio.$getObjectSource.subscribe(data => {
      console.log(data)
      this.nombre = data;
  }).unsubscribe();

  
  this.servicio.$getListSource.subscribe(list => console.log(list)).unsubscribe();
  }

  cerrar(){
    localStorage.removeItem("listadoObjetos");
    this.listado = [];
    console.log(this.materias);
    this.router.navigate(['/login']);
    localStorage.removeItem("listadoCursos");
  }
}
