import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServicioService } from '../servicios/servicio.service';
import { ApiService } from '../ApiService/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  usuario : string;
  contraseña : String;
  mensaje : String;
  user : '';
  constructor(private AlertController: AlertController,
              private toastController: ToastController,
              private router : Router,
              private servicio : ServicioService,
              public navCtrl : NavController,
              private api:ApiService) {}
              
 ngOnInit() {
}



async com_user(usuario : HTMLInputElement, contraseña : HTMLInputElement) {
      

   }

  async login(usuario : HTMLInputElement, contraseña : HTMLInputElement)
  {
    if(usuario.value == "")
    {
      const toast = await this.toastController.create({
        color : 'danger',
        message : "usuario incorrecto o celda vacia",
        duration : 2000,
        position : 'top',
        icon: 'alert-circle-outline'
      })
      toast.present();
    }

    
    else if(contraseña.value == "")
    {
      const toast = await this.toastController.create({
        color : 'danger',
        message : "contraseña incorrecta o celda vacia",
        duration : 2000,
        position : 'top',
        icon: 'alert-circle-outline'
      })
      toast.present();
    }
    else if(contraseña.value == "1234")
    {
      const toast = await this.toastController.create({
        color : 'success',
        message : "sesion iniciada",
        duration : 1500,
        position : 'top',
        icon: 'school-outline'
      })
      toast.present();

      this.servicio.sendobjectsource(this.user);
      usuario.value="";
      contraseña.value="";
      this.router.navigate(['/index']);
    }







    else
    {
      const toast = await this.toastController.create({
        color : 'danger',
        message : "usuario no registrado",
        duration : 1500,
        position : 'top',
        icon: 'alert-circle-outline'
      })
      toast.present();
    }
  }

}
