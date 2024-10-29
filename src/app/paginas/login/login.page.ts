import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  Gmail: string = "";
  Contrasenna: string = "";
  private _storage: Storage | null = null;

  isGmailError: boolean = false;
  isContrasennaError: boolean = false;

  isGmailSuccess: boolean = false;
  isContrasennaSuccess: boolean = false;

  constructor(public mensaje: ToastController,
    public alert: AlertController,
    private router: Router,
    private storage: Storage,
    private acces: FirebaseLoginService){}


  async ngOnInit() {
    this._storage = await this.storage.create();
  }

  async MensajeError(mensajeError: string) {
    const alert = await this.alert.create({
      header: 'Error de inicio de sesion',
      subHeader: 'Contraseña o Usuario incorrecto',
      message: mensajeError,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  /*se ve que los campos no esten vacios*/
  checkInput() {
    this.isGmailError = this.Gmail.trim() === '';
    this.isGmailSuccess = !this.isGmailError;

    this.isContrasennaError = this.Contrasenna.trim() === '';
    this.isContrasennaSuccess = !this.isContrasennaError;
  }

  /*funciona al presionarlos*/
  mostrarAlerta() {
    this.checkInput();
    if (this.Gmail === "" && this.Contrasenna === "") {
      console.log("No puede dejar ni el usuario ni la contraseña sin completar")
      this.MensajeError("Nombre o Contraseña erronea")
    }
    else {
      this.acces.login(this.Gmail, this.Contrasenna).then(() => {
        this.storage.set("gmail", this.Gmail)
        this.storage.set("SessionID", true)
        this.storage.set("contrasenna", this.Contrasenna)
        console.log("inicio de sesion exitoso ")
        this.redirigir();
      }).catch((error) => {
        this.MensajeError(this.traducirMensajeError(error));
      })
    }
  }

  redirigir() {
    this.router.navigate(['home']);
  }



  traducirMensajeError(error: any): string {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'El formato del correo electrónico es incorrecto.';
      case 'auth/user-not-found':
        return 'No existe un usuario con ese correo.';
      case 'auth/wrong-password':
        return 'La contraseña es incorrecta.';
      case 'auth/invalid-credential':
        return 'Correo o contraseña son incorrectas.';
      default:
        return 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo.';
    }
  }
}

