import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Identimons } from './identimons';

describe('Identimons', () => {
  let component: Identimons;
  let fixture: ComponentFixture<Identimons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Identimons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Identimons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
