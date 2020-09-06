import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CBPAppbarComponent } from './cbp.appbar.component';

describe('AppbarComponent', () => {
  let component: CBPAppbarComponent;
  let fixture: ComponentFixture<CBPAppbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CBPAppbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CBPAppbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
