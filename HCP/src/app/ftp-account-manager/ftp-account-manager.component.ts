import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // Add this
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Add ReactiveFormsModule
import { Router, RouterModule } from '@angular/router'; // Add RouterModule
import { MatButtonModule } from '@angular/material/button'; // For mat-raised-button

// Define the FTP account interface
interface FtpAccount {
  id: number;
  username: string;
  actualPassword: string;
  description: string;
  relativePath: string;
}

@Component({
  selector: 'app-ftp-account-manager',
  standalone: true,
  imports: [
    CommonModule, // Add this for ngClass, ngIf, ngFor
    ReactiveFormsModule, // For formGroup
    RouterModule, // For router navigation
    MatButtonModule // For mat-raised-button
  ],
  templateUrl: './ftp-account-manager.component.html',
  styleUrls: ['./ftp-account-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FtpAccountManagerComponent {
  // Mock FTP accounts (replace with service data in a real app)
  ftpAccounts: FtpAccount[] = [
    { id: 1, username: 'ana_qamain_user', actualPassword: 'password1', description: 'Main user', relativePath: '/htdocs' },
    { id: 2, username: 'ftp123456', actualPassword: 'password2', description: 'Secondary user', relativePath: '/' }
  ];

  // Service details for usage bar
  serviceDetail = { activeQuantity: 2, limit: 50, percentageUsed: 4 };

  // Configuration properties
  domainAlias = 'q103187cf.netsolhost.com';
  platform = 'WIN';
  showPasswordButton = true;
  showSshCheckbox = false;
  showSecureFTP = false;
  showTIPSection = true;
  fileman = 'fileman';
  showPasswords = false;

  // Reactive form for account selection
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      ftp_id: [null]
    });
  }

  // Navigation methods
  editAccount(id: number | null) {
    if (id) {
      this.form.patchValue({ ftp_id: id });
      this.router.navigate(['/ftpaccounts/edit', id, this.showSshCheckbox]);
    } else {
      console.warn('No FTP account selected for editing.');
    }
  }

  deleteAccount(id: number | null) {
    if (id) {
      this.form.patchValue({ ftp_id: id });
      this.router.navigate(['/ftpaccounts/delete', id]);
    } else {
      console.warn('No FTP account selected for deletion.');
    }
  }

  addAccount() {
    this.router.navigate(['/ftpaccounts/add']);
  }

  resetFilePermissions() {
    console.log('Resetting file permissions...');
    this.router.navigate(['/resetFilePermissions']);
  }

  togglePasswordVisibility() {
    this.showPasswords = !this.showPasswords;
    this.cdr.markForCheck();
  }
}