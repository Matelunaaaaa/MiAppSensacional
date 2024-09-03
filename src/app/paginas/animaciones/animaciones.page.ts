import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChildren } from '@angular/core';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';

@Component({
  selector: 'app-animaciones',
  templateUrl: './animaciones.page.html',
  styleUrls: ['./animaciones.page.scss'],
})
export class AnimacionesPage implements OnInit {
  @ViewChildren(IonCard, { read: ElementRef }) cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;
  private animation!: Animation;

  constructor(private animacionCtr1 : AnimationController) { }
  ngAfterViewInit(){
    const cardA = this.animacionCtr1
    .create()
    .addElement(this.cardElements.get(0)!.nativeElement)
  
    .keyframes([
      { offset: 0, transform: 'scale(1)', opacity: '1' },
      { offset: 0.5, transform: 'scale(1.5)', opacity: '0.3' },
      { offset: 1, transform: 'scale(1)', opacity: '1' },
    ]);

    this.animation = this.animacionCtr1
    .create()
    .duration(2000)
    .iterations(Infinity)
    .addAnimation([cardA])

    this.animation.play()

  }
  

  

  ngOnInit() {
  }

}
