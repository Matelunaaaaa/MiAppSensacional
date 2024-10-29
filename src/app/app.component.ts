import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
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
  sessionSubscription: Subscription | undefined; 
  mostrarMenu: boolean = true;

  constructor(
    private router: Router, 
    public alerta: AlertController,
    private storage: Storage, 
    private access: FirebaseLoginService
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.checkSession();

    // Intervalo para revisar la sesión cada segundo
    this.sessionSubscription = interval(1000).subscribe(() => {
      this.checkSession();
    });

    // Escucha los eventos del router y verifica la ruta actual
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.comprobarRuta(event.url);
      }
    });
  }

  async checkSession() {
    const SessionID = await this.storage.get('SessionID');
    this.sessionActive = !!SessionID;
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
    localStorage.removeItem('translationHistory');
    localStorage.removeItem('idiomadetraduccion');
    await this.access.logout();
    this.sessionActive = false;
    this.router.navigate(['/login']);
  }

  comprobarRuta(url: string) {
    // Oculta el menú en las páginas de login y registro
    this.mostrarMenu = !(url === '/login' || url === '/registro');
  }

  ngOnDestroy() {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }
}
