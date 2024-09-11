import { Component, OnInit } from '@angular/core';
import { InformacionusuarioService } from 'src/app/servicios/informacionusuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  Usuario: string = '';

  constructor(private informacionUsuarioService: InformacionusuarioService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.Usuario = this.informacionUsuarioService.getUsername();
      console.log("Usuario obtenido: ", this.Usuario);
    });
  }
}