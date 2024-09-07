import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  checkInput() { //aqui se ve si los campos estan vacios
    this.isUsuarioError = this.Usuario.trim() === '';
    this.isContrasennaError = this.Contrasenna.trim() === '';
  }

  mostrarAlerta() {
    this.checkInput();
    if (!this.isUsuarioError && !this.isContrasennaError) {
      this.redirigir();
    }
  }
  redirigir() {
    this.router.navigate(['home']);
  }

  ngOnInit() {}
}
