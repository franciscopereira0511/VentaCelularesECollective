import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SOAPPage } from './soap.page';

describe('SOAPPage', () => {
  let component: SOAPPage;
  let fixture: ComponentFixture<SOAPPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SOAPPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SOAPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
