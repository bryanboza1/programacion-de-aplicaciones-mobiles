import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'
import { AlertController, ToastController } from '@ionic/angular';
import { asistencia, ServiciosService } from '../servicios.service';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {
  usuario;
  scannedResult: any;
  content_visibility='';
  fechaCorta: string = new Date().toISOString();
  fecha: string = this.fechaCorta;


  constructor(private camera: Camera,public fb:FormBuilder,
              private alertcontroller: AlertController,
              private router : Router,
              private toastController: ToastController,
              private servicioPersona : ServiciosService) {}

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("listadoObjetos"));
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




  scan(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }


  ngOnDestroy(): void {
    this.stopScan();
  }

}
