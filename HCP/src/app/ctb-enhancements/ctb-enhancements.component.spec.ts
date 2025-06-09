import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtbEnhancementsComponent } from './ctb-enhancements.component';

describe('CtbEnhancementsComponent', () => {
  let component: CtbEnhancementsComponent;
  let fixture: ComponentFixture<CtbEnhancementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtbEnhancementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtbEnhancementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
