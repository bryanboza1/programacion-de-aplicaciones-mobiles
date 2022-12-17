import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { MenuController, NavParams, ToastController } from '@ionic/angular';
import { ServicioService } from '../servicios/servicio.service';


@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  constructor(private menu: MenuController,
    private servicio:ServicioService,
    private router : Router,
    private toastController : ToastController,) { 
}


  ngOnInit() {
  }


  async generar (){

    const toast = await this.toastController.create({
      color : 'success',
      message : "QR generado",
      duration : 1500,
      position : 'top',
      icon: ''
    })
    toast.present();
    this.router.navigate(['/ver-qr']);
    
  }
}
