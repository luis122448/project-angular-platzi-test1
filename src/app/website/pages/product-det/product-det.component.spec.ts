import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetComponent } from './product-det.component';

describe('ProductDetComponent', () => {
  let component: ProductDetComponent;
  let fixture: ComponentFixture<ProductDetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
