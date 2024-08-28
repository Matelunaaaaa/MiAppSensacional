import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  Usuario: string="";
  Contrasenna: string="";

  constructor(public alerta:AlertController){}

  async presentAlert(titulo:string,message:string){
    const alert = await this.alerta.create({
      header:titulo,
      message:message,
      buttons:["OK"]

    })
    await alert.present();
  }

  mostrarAlerta(){
    if(this.Usuario=="" || this.Contrasenna=="") {
      this.presentAlert("Advertencia", "Los campos no pueden estar vacíos")}
  }
  

  ngOnInit() {
  }

}
