import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CalculadoraPage } from './calculadora.page';

describe('Calculadora:', () =>{
  let component : CalculadoraPage;
  let fixture: ComponentFixture<CalculadoraPage>;

  beforeEach(waitForAsync(async ()=>{
    await TestBed.configureTestingModule({
      declarations: [CalculadoraPage],
      imports:[IonicModule.forRoot()]
    }).compileComponents();
    fixture =TestBed.createComponent(CalculadoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('sumar', async()=>{
    (<HTMLInputElement>document.getElementById('numero1')).value='10';
    (<HTMLInputElement>document.getElementById('numero2')).value='10';
    document.getElementById('btnsuma')?.click();
    const valor = (<HTMLInputElement>document.getElementById('resultado')).value;
    expect(valor).toContain('20');
  });
});