import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ftp-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule
  ],
  templateUrl: './create-ftp-account.component.html',
  styleUrls: ['./create-ftp-account.component.scss']
})
export class CreateFtpAccountComponent implements OnInit {
  ftpForm: FormGroup;
  platform: string = 'UNIX'; // Mock platform (replace with service)
  activeQuantity: number = 2; // Mock serviceDetail.activeQuantity
  limit: number = 50; // Mock serviceDetail.limit
  directoryContent: string = this.platform === 'WIN' ? '/www' : '/htdocs';
  showWarning: boolean = false; 

  constructor(private fb: FormBuilder, private router: Router) {
    this.ftpForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_%]+$/) // Alphanumeric, underscore, percentage
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
        this.complexPasswordValidator()
      ]],
      confirmPassword: ['', Validators.required],
      description: [''],
      relativePath: [this.directoryContent] // Default to /htdocs or /www
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  // Password complexity: At least 3 of 4 categories (uppercase, lowercase, number, special)
  complexPasswordValidator() {
    return (control: any) => {
      const value = control.value || '';
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecial = /[^A-Za-z0-9]/.test(value);
      const categories = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
      return categories >= 3 ? null : { complexPassword: true };
    };
  }

  // Ensure password and confirmPassword match
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.ftpForm.valid) {
      console.log('Form submitted:', this.ftpForm.value);
      // TODO: Call HTTP service to POST to /ftpaccounts/new
      // e.g., this.http.post('/ftpaccounts/new', this.ftpForm.value).subscribe();
    } else {
      this.showWarning = true;
    }
  }

  onCancel(): void {    
    this.router.navigate(['/ftp-manager']);
  }
}