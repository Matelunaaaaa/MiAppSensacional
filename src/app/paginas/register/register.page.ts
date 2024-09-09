import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  Gmail: string = "";
  Usuario: string = "";
  Contrasenna: string = "";
  isGmailError: boolean = false;
  isUsuarioError: boolean = false;
  isContrasennaError: boolean = false;
  isGmailSuccess: boolean = false;
  isUsuarioSuccess: boolean = false;
  isContrasennaSuccess: boolean = false;

  constructor() {}

  /* aqui se ve si los campos estan vacios*/
  checkInput() {
    this.isGmailError = this.Gmail.trim() === '';
    this.isGmailSuccess = !this.isGmailError;
    this.isUsuarioError = this.Usuario.trim() === '';
    this.isUsuarioSuccess = !this.isUsuarioError;
    this.isContrasennaError = this.Contrasenna.trim() === '';
    this.isContrasennaSuccess = !this.isContrasennaError;
  }

  /*con esto hace que los colores se pongan al presionar el boton*/
  mostrarAlerta() {
    this.checkInput();
  }

  ngOnInit() {}
}
