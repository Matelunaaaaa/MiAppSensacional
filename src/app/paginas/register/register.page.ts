import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  Usuario: string = "";
  Contrasenna: string = "";
  Gmail: string = "";
  
  constructor(public alerta: AlertController, private router: Router) {}

  async presentAlert(titulo: string, message: string) {
    const alert = await this.alerta.create({
      header: titulo,
      message: message,
      buttons: ["OK"]
    });
    await alert.present();
  }

  async mostrarAlerta() {
    if (this.Usuario === "" || this.Contrasenna === "" || this.Gmail == "") {
      await this.presentAlert("Advertencia", "Los campos no pueden estar vacíos");
    } else {
      this.redirigir();
    }
  }

  redirigir() {
    this.router.navigate(['login']);
  }

  ngOnInit() {
  }
}