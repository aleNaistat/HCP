import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeErrorPageComponent } from './customize-error-page.component';

describe('CustomizeErrorPageComponent', () => {
  let component: CustomizeErrorPageComponent;
  let fixture: ComponentFixture<CustomizeErrorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomizeErrorPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomizeErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
