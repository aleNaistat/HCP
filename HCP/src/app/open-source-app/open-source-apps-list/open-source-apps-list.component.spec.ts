import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSourceAppsListComponent } from './open-source-apps-list.component';

describe('OpenSourceAppsListComponent', () => {
  let component: OpenSourceAppsListComponent;
  let fixture: ComponentFixture<OpenSourceAppsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenSourceAppsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenSourceAppsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
