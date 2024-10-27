import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from 'src/app/componentes/footer/footer.component';



@NgModule({
  declarations: [FooterComponent],
  exports: [FooterComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ShareModule { }
