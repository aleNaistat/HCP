import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcpHomeMenuComponent } from './hcp-home-menu.component';

describe('HcpHomeMenuComponent', () => {
  let component: HcpHomeMenuComponent;
  let fixture: ComponentFixture<HcpHomeMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HcpHomeMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HcpHomeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
