import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtpPermissionsComponent } from './ftp-permissions.component';

describe('FtpPermissionsComponent', () => {
  let component: FtpPermissionsComponent;
  let fixture: ComponentFixture<FtpPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FtpPermissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FtpPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
