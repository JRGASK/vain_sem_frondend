import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerOrderComponent } from './create-customer-order.component';

describe('CreateCustomerOrderComponent', () => {
  let component: CreateCustomerOrderComponent;
  let fixture: ComponentFixture<CreateCustomerOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCustomerOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCustomerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
