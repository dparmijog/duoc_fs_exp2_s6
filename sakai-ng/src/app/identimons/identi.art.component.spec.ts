import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentiArtComponent } from './identi.art.component';

describe('IdentimonIdentiArtComponentsComponent', () => {
  let component: IdentiArtComponent;
  let fixture: ComponentFixture<IdentiArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentiArtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdentiArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
