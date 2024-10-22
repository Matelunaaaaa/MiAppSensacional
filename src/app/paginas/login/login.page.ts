import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';
import { InformacionusuarioService } from 'src/app/servicios/informacionusuario.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  Usuario: string = "";
  Contrasenna: string = "";
  private _storage: Storage | null = null;
  
  isUsuarioError: boolean = false;
  isContrasennaError: boolean = false;
  
  isUsuarioSuccess: boolean = false;
  isContrasennaSuccess: boolean = false;

  constructor(public mensaje:ToastController, public alert:AlertController, private router: Router, private storage: Storage, private InformacionusuarioService: InformacionusuarioService, private acces:FirebaseLoginService) {}


  async ngOnInit() {
    this._storage = await this.storage.create();
  }
  
  async MensajeError(){
    const alert = await this.alert.create({
      header : 'Error de inicio de sesion',
      subHeader: 'Contraseña o Usuario incorrecto',
      message: 'Error al iniciar sesion en la cuenta',
      buttons: ['Aceptar']
    })
  }

  /*se ve que los campos no esten vacios*/
    checkInput() {
      this.isUsuarioError = this.Usuario.trim() === '';
      this.isUsuarioSuccess = !this.isUsuarioError;

      this.isContrasennaError = this.Contrasenna.trim() === '';
      this.isContrasennaSuccess = !this.isContrasennaError;
    }

    /*funciona al presionarlos*/
    mostrarAlerta() {
      this.checkInput();
      if (this.Usuario == "" && this.Contrasenna == "") {
        console.log("No puede dejar ni el usuario ni la contraseña sin completar")
        this.MensajeError()
      }
      else{
        this.acces.login(this.Usuario,this.Contrasenna).then(()=>{
          this.storage.set("nombre",this.Usuario)
          this.storage.set("SessionID",true)
          console.log("inicio de sesion exitoso ")
          this.InformacionusuarioService.setUsername(this.Usuario);
          this.redirigir();
    }).catch(()=>{
      this.MensajeError()
    })
  }
}

  redirigir() {
    this.router.navigate(['home']);
  }

  async guardarUsuario(usuario: string) {
    await this._storage?.set('usuario', usuario);
  }
}

