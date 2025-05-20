import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDrawerComponent } from './home-drawer.component';

describe('HomeDrawerComponent', () => {
  let component: HomeDrawerComponent;
  let fixture: ComponentFixture<HomeDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
