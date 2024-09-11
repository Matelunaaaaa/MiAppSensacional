import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class InformacionusuarioService {
  private username: string='';

  constructor() { }

  setUsername (name:  string){
    this.username = name;
  }

  getUsername(): string{
    return this.username;
  }
}
