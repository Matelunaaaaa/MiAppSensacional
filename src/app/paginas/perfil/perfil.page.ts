import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  Usuario: string = '';

  constructor(private storage: Storage,) { }

  async ngOnInit() {

    this.Usuario = await this.storage.get('nombre')
  }

}
