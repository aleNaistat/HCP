import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomErrorPagesComponent } from './custom-error-pages.component';

describe('CustomErrorPagesComponent', () => {
  let component: CustomErrorPagesComponent;
  let fixture: ComponentFixture<CustomErrorPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomErrorPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomErrorPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
