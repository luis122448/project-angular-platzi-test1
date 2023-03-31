import { Component } from '@angular/core';
import { OnExit } from 'src/app/guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
// Implementando Funcion Logica
export class RegisterComponent implements OnExit{

  onExit(){
    const rta = confirm('Desea Salir?')
    return rta;
  }

}
