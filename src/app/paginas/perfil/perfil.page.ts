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
  Usuario: string = '';

  constructor(private storage: Storage,
    private fireBaseLogin : FirebaseLoginService,
    private angularFire : AngularFireAuth 
  ) { }

  async ngOnInit() {

    this.Usuario = await this.storage.get('nombre')
  }

}
