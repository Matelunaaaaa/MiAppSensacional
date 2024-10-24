import { Component, OnInit, OnDestroy } from '@angular/core';
import { InformacionusuarioService } from 'src/app/servicios/informacionusuario.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';
import { Storage } from '@ionic/storage-angular';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  Usuario: string = ''; 
  sessionActive: boolean = false;
  sessionSubscription: Subscription | undefined; // Maneja el ciclo de vida del intervalo

  constructor(
    private informacionUsuarioService: InformacionusuarioService, 
    private router: Router, 
    public alerta: AlertController,
    private storage: Storage, 
    private access: FirebaseLoginService
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.checkSession();

    this.sessionSubscription = interval(1000).subscribe(() => {
      this.checkSession(); // Revisa el estado de la sesión periódicamente
    });
  }

  async checkSession() {
    const SessionID = await this.storage.get('SessionID');
    if(SessionID) {
      this.sessionActive = true;
    } else {
      this.sessionActive = false;
    }
  }

  async CerrarSesion() {
    const alert = await this.alerta.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: async () => {
            await this.cerrarSesion();
          }
        }
      ]
    });

    await alert.present();
  }

  async cerrarSesion() {
    await this.storage.remove('nombre');
    await this.storage.remove('SessionID');
    await this.access.logout();
    this.sessionActive = false; // Actualiza el estado de la sesión
    this.router.navigate(['/login']);
  }

  // Cancela la suscripción del intervalo cuando se destruye el componente
  ngOnDestroy() {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }
}
