import { Component, OnDestroy, OnInit, ValueProvider } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'
import { AlertController, ToastController } from '@ionic/angular';
import { asistencia, ServiciosService } from '../servicios.service';
import { FormGroup } from '@angular/forms';
import { identity } from 'rxjs';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  usuario= JSON.parse(localStorage.getItem("listadoObjetos"));
  materiaid=  JSON.parse(localStorage.getItem("listadoCursos"));
  scannedResult: any;
  content_visibility='';
  fechaCorta: string = new Date().toISOString();
  fecha: string = this.fechaCorta;
  newasistencia:asistencia={
    fecha:this.fechaCorta,
    asistencia : '',
    idusuario:this.usuario.id,
    materiaid:""
  }
  

  constructor(private camera: Camera,
    private alertcontroller: AlertController,
    private router : Router,
    private toastController: ToastController,
    private servicioasistencia : ServiciosService) { }

  ngOnInit() {
  }


creaasistencia(){
  this.servicioasistencia.crearasistencia(this.newasistencia).subscribe()
}

  async checkPermission(){
    try{
      const status = await BarcodeScanner.checkPermission({force: true});
      if(status.granted){
        return true;
      }
      return false;
     }catch(e){
      console.log(e);
     }  
    }
   async startScan(){
    try{
      const permission = await this.checkPermission();
      if(!permission){
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.content_visibility='hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      if(result?.hasContent){
        this.scannedResult = result.content;
        BarcodeScanner.showBackground();
        document.querySelector('body').classList.remove('scanner-active');
        this.content_visibility='';
        console.log(this.scannedResult);
      }
    }catch(e){
      console.log(e);
      this.stopScan();
    }
   }
   stopScan(){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.content_visibility=''; 
  }
  
}
