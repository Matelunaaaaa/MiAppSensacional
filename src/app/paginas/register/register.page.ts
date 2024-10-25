import { Component, OnInit } from '@angular/core';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  Gmail: string = "";
  Usuario: string = "";
  Contrasenna: string = "";
  isGmailError: boolean = false;
  isUsuarioError: boolean = false;
  isContrasennaError: boolean = false;
  isGmailSuccess: boolean = false;
  isUsuarioSuccess: boolean = false;
  isContrasennaSuccess: boolean = false;
  successMessage: string = "";

  constructor(private router: Router, private acsses: FirebaseLoginService, private alertController: AlertController) { }

  /* Aquí se ve si los campos están vacíos */
  checkInput() {
    this.isGmailError = this.Gmail.trim() === '';
    this.isGmailSuccess = !this.isGmailError;
    this.isUsuarioError = this.Usuario.trim() === '';
    this.isUsuarioSuccess = !this.isUsuarioError;
    this.isContrasennaError = this.Contrasenna.trim() === '';
    this.isContrasennaSuccess = !this.isContrasennaError;
  }

  /* Con esto hace que los colores se pongan al presionar el botón */
  async mostrarAlerta() {
    this.checkInput();

    this.successMessage = ""; 

    if (this.Contrasenna.length < 5) {
      await this.presentAlert('Error', 'La contraseña debe tener al menos 5 caracteres.');
      return;
    } 

    if (this.isUsuarioSuccess && this.isContrasennaSuccess && this.isGmailSuccess) {
      await this.crearUsuario();
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      
    });

    await alert.present();
  }

  ngOnInit() { }

  async crearUsuario() {
    try {
      await this.acsses.create_user(this.Gmail, this.Contrasenna, this.Usuario);
      console.log("Usuario creado exitosamente");
      this.MensajeCorrecto();
      this.redirigir();
    } catch (error) {
      console.log("Error al crear el usuario");
      this.MensajeIncorrecto();
    }
  }

  redirigir() {
    this.router.navigate(['login']);
  }

  async MensajeCorrecto() {
    const alert = await this.alertController.create({
      header: '¡ÉXITO!',
      subHeader: 'Registro Exitoso',
      message: '',
      buttons: ['Aceptar'],
    });
    await alert.present();
    }

    async MensajeIncorrecto() {
      const alert = await this.alertController.create({
        header: '¡ERROR!',
        subHeader: 'Hubo un problema al crear la cuenta',
        message: '',
        buttons: ['Aceptar'],
      });
      await alert.present();
      }
}
