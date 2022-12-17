import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.page.html',
  styleUrls: ['./calculadora.page.scss'],
})
export class CalculadoraPage implements OnInit {
  @ViewChild('resultado') resultado:any;
  constructor() { }

  ngOnInit() {
  }
  sumar(numero1:string,numero2:string)
  {
    const num1 = Number(numero1);
    const num2 = Number(numero2);
    let total = num1 + num2;
    this.resultado.nativeElement.value= total;
  }

}
