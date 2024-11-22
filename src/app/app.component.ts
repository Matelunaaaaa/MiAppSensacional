import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
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

  constructor(
    private router: Router, 
    public alerta: AlertController,
    private storage: Storage, 
    private access: FirebaseLoginService,
    private menuCtrl: MenuController // Controlador del menú
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.checkSession();

    // Intervalo para verificar la sesión
    this.sessionSubscription = interval(1000).subscribe(() => {
      this.checkSession();
    });

    // Cerrar el menú al navegar a una nueva vista
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.menuCtrl.close(); // Cierra el menú al cambiar de vista
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
    localStorage.removeItem('email');
    localStorage.removeItem('contrasenna');
    localStorage.removeItem('translationHistory');
    localStorage.removeItem('idiomadetraduccion');
    await this.storage.remove('SessionID');
    await this.access.logout();
    this.sessionActive = false;
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }
}
