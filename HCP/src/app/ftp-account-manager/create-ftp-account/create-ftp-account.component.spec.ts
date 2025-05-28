import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFtpAccountComponent } from './create-ftp-account.component';

describe('CreateFtpAccountComponent', () => {
  let component: CreateFtpAccountComponent;
  let fixture: ComponentFixture<CreateFtpAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFtpAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFtpAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
