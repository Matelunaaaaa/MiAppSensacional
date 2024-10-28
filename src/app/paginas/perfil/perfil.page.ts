import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  Gmail: string = '';
  Contrasenna: string = '';
  userName: string | null = null;
  userIdioma : string | null = null;
  

  constructor(private storage: Storage,
    private fireBaseLogin : FirebaseLoginService,
    private angularFire : AngularFireAuth 
  ) { }

  async ngOnInit() {

    this.Gmail = await this.storage.get('gmail')
    this.Contrasenna = await this.storage.get('contrasenna')
    this.fireBaseLogin.getCurrentUserName().subscribe((name) => {
      this.userName = name;
    });

    this.fireBaseLogin.getCurrentUserIdioma().subscribe((idioma) => {
      this.userIdioma = idioma;
  });
  
  }
  
}
