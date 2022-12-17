import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import {  NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    //variables
    emaill: String;
    pass: String;
    personas;
    id: number=1;
    n: number=0;
  
    nombre:{
      nombre:"",
    }


    aviso = String;
    userForm: FormGroup;

  formulariologin: FormGroup;
  user : '';

  constructor(public fb:FormBuilder, public alertController : AlertController, private router : Router, private servicio : ServiciosService,private toastController: ToastController,) { 

    this.formulariologin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    this.servicio.getPersonas().subscribe(
      (response) => { this.personas = response;
        this.id =this.personas.length;
      }
    )
  }
  async login(email: HTMLInputElement, password: HTMLInputElement){
    this.emaill = email.value; this.pass = password.value;
    for (this.n; this.n < this.id; this.n++) {
      if(this.personas[this.n].email!=this.emaill, this.personas[this.n].pass != this.pass){
        this.router.navigate(['/login']);
      }
      else if(this.personas[this.n].pass!=this.pass){
        this.router.navigate(['/login']);
      }
      else if(this.personas[this.n].pass=="profe"){
        this.router.navigate(['/profesor']);
      }
      else if(this.personas[this.n].email!=this.emaill){
        this.router.navigate(['/login']);
      }
      else{
        let listadoJson = JSON.stringify(this.personas[this.n]);
        localStorage.setItem("listadoObjetos", listadoJson);
        console.log("Login");
        const toast = await this.toastController.create({
          color : 'success',
          message : "Bienvenido" +" "+ this.emaill,
          duration : 2000,
          position : 'top',
          icon: 'alert-circle-outline'
        })
        toast.present()
        this.router.navigate(['/index']);
        break
      }
    }
  }
}
