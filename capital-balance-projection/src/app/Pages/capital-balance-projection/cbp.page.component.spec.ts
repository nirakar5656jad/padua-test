import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CBPPageComponent } from './cbp.page.component';

describe('Cbp.Page.ComponentComponent', () => {
  let component: CBPPageComponent;
  let fixture: ComponentFixture<CBPPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CBPPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CBPPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
