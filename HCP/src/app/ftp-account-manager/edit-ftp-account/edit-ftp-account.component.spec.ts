import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFtpAccountComponent } from './edit-ftp-account.component';

describe('EditFtpAccountComponent', () => {
  let component: EditFtpAccountComponent;
  let fixture: ComponentFixture<EditFtpAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFtpAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFtpAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
