import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionusuarioService } from 'src/app/servicios/informacionusuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  Usuario: string = "";
  Contrasenna: string = "";
  
  isUsuarioError: boolean = false;
  isContrasennaError: boolean = false;
  
  isUsuarioSuccess: boolean = false;
  isContrasennaSuccess: boolean = false;

  constructor(private router: Router, private InformacionusuarioService: InformacionusuarioService) {}

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
    if (this.isUsuarioSuccess && this.isContrasennaSuccess) {
      this.InformacionusuarioService.setUsername(this.Usuario);
      this.redirigir();
    }
  }

  redirigir() {
    this.router.navigate(['home']);
  }

  ngOnInit() {}
}
