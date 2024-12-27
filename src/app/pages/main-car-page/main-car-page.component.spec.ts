import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCarPageComponent } from './main-car-page.component';

describe('MainCarPageComponent', () => {
  let component: MainCarPageComponent;
  let fixture: ComponentFixture<MainCarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCarPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
