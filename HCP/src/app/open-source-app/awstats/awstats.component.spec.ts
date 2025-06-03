import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwstatsComponent } from './awstats.component';

describe('AwstatsComponent', () => {
  let component: AwstatsComponent;
  let fixture: ComponentFixture<AwstatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwstatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
