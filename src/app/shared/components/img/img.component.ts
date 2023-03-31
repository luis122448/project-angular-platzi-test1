import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {

// Identificar el cambio por el tipo de Imput desde el SET
  img = 'valor init';
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img') set changeImg(newImg: string){
    this.img = newImg;
    // console.log('change just img => ' + this.img);
    // Code
  }
  @Input() alt = 'valor init alt';
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() load = new EventEmitter<string>();
  imgDefault = 'https://www.m2crowd.com/core/i/placeholder.png';
  counter = 0;
  counterFn: number | undefined;

  // constructor() {
  //   // Before render
  //   // NO! async
  //   // Once time
  //   console.log('constructor ==> ' +  this.img);
  // }

  // // Identificar el cambio, dentro del ngOnChanges, If*
  // ngOnChanges(changes: SimpleChanges) {
  //   // Before - During render
  //   // Change inputs
  //   // Times
  //   console.log('ngOnChange ==> ' +  this.img);
  //   console.log('changes ==> ' +  changes);
  // }

  // ngOnInit(): void {
  //     // Before render
  //     // Async
  //     // Once time
  //     console.log('ngOnInit ==> ' +  this.img);
  //     // this.counterFn =  window.setInterval(() => {
  //     //   this.counter += 1;
  //     //   console.log('Run counter')
  //     // }, 1000);
  // }

  // ngAfterViewInit(): void {
  //     // After render
  //     // Handler children
  //     console.log('ngAfterViewInit ==> ' +  this.img);
  // }

  // ngOnDestroy(): void {
  //     // Only delete
  //     console.log('ngOnDestroy ==> ' +  this.img);
  //     window.clearInterval(this.counterFn);
  // }

  onImgError(){
    this.img = this.imgDefault;
  }

  onImgLoad(){
    // Enviando hacia el Padre el Evento
    this.load.emit(this.img);
  }

}
