import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms'
import {  NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { Persona, ServiciosService } from '../servicios.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegsitro: FormGroup;
  userForm: FormGroup;
  personas;
  persona = new Persona();
  numero: number;

  aviso = String;
  constructor(public fb:FormBuilder,
    private alertcontroller: AlertController,
    public alertController: AlertController,
    private router : Router,
    private toastController: ToastController,
    private servicioPersona : ServiciosService ) { 

    this.formularioRegsitro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'Confirmarpassword': new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
  }

  async Registrar(){
    var f = this.formularioRegsitro.value;

    if(this.formularioRegsitro.invalid){
      const alert = await this.alertController.create({
        header:'Datos incompletos',
        message : 'Error en el registro llena los campos',
        buttons: ['Aceptar']

      });
      await alert.present();
      return;
    }
    var usuario= {
      nombre: f.nombre,
      password: f.password,
    }
    localStorage.setItem('usuario',JSON.stringify(usuario));
    const toast = await this.toastController.create({
      color : 'success',
      message : "Usuario registrado",
      duration : 2000,
      position : 'top',
      icon: 'alert-circle-outline'
    })
    toast.present();
    this.router.navigate(['/login']);
  }



  async registro( nombre: HTMLInputElement,nombre2: HTMLInputElement,
    apellido: HTMLInputElement,apellido2: HTMLInputElement, run: HTMLInputElement, email: HTMLInputElement, pass: HTMLInputElement,
    tipo:HTMLInputElement,asignaturas:HTMLInputElement){
      this.numero = parseInt(asignaturas.value);
    if( nombre.value == "",nombre2.value == "",apellido.value == "",
    apellido2.value == "", run.value == "", email.value =="",tipo.value =="",asignaturas.value == "")
    {
      const mensaje = await this.alertcontroller.create({
        header: 'Datos',
        subHeader: 'Error al registrar',
        message: 'Faltan Datos',
        buttons: ['OK'],
      });
      await mensaje.present();
    }
    else if( this.numero == 0){
      const mensaje = await this.alertcontroller.create({
        header: 'Datos',
        subHeader: 'Error al registrar',
        message: 'El minimo de materias asociadas es 1',
        buttons: ['OK'],
      });
      await mensaje.present();
    }
    else if(tipo.value != "Profesor", tipo.value != "Alumno"){
      const mensaje = await this.alertcontroller.create({
        header: 'Datos',
        subHeader: 'Error al registrar',
        message: 'Solo escribir "Profesor" o "Alumno", tal y como está escrito',
        buttons: ['OK'],
      });
      await mensaje.present();
    }
    else if(tipo.value != "Alumno"){
      const mensaje = await this.alertcontroller.create({
        header: 'Datos',
        subHeader: 'Error al registrar',
        message: 'Solo escribir "Profesor" o "Alumno", tal y como está escrito',
        buttons: ['OK'],
      });
      await mensaje.present();
    }
  
    else{
    //Agregar persona
      
      this.persona.nombre = nombre.value + " "+ nombre2.value;
      this.persona.apellido = apellido.value + " "+ apellido2.value;
      this.persona.run = run.value;
      this.persona.email = email.value;
      this.persona.pass = pass.value;
      this.persona.tipo = tipo.value;
      this.persona.materias = this.numero;
      this.servicioPersona.createPersona(this.persona).subscribe(
      ()=>{console.log("Usuario creado");}
    );
    let listadoJson = JSON.stringify(this.persona);
    localStorage.setItem("listadoObjetos", listadoJson);
      const mensaje = await this.alertcontroller.create({
        header: 'Datos',
        subHeader: 'Registro',
        message: 'El registro ha sido exitoso',
        buttons: ['OK'],
      });
      await mensaje.present();
      this.router.navigate(['/index']);
      
    }
  }
}
