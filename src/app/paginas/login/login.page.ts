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
  
  isUsuarioSuccess: boolean = false;
  isContrasennaSuccess: boolean = false;

  constructor(private router: Router) {}

  /*se ve que los campos no esten vacios*/
  checkInput() {
    this.isUsuarioError = this.Usuario.trim() === '';
    this.isUsuarioSuccess = !this.isUsuarioError;
    
    this.isContrasennaError = this.Contrasenna.trim() === '';
    this.isContrasennaSuccess = !this.isContrasennaError;
  }

  /*funciona al oresionarlos*/
  mostrarAlerta() {
    this.checkInput();
    if (this.isUsuarioSuccess && this.isContrasennaSuccess) {
      this.redirigir();
    }
  }

  redirigir() {
    this.router.navigate(['home']);
  }

  ngOnInit() {}
}
