import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFtpAccountComponent } from './delete-ftp-account.component';

describe('DeleteFtpAccountComponent', () => {
  let component: DeleteFtpAccountComponent;
  let fixture: ComponentFixture<DeleteFtpAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteFtpAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFtpAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
