import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-ftp-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    RouterModule
  ],
  templateUrl: './edit-ftp-account.component.html',
  styleUrls: ['./edit-ftp-account.component.scss']
})
export class EditFtpAccountComponent implements OnInit {
  editForm: FormGroup;
  platform: string = 'UNIX'; 
  activeQuantity: number = 2;
  limit: number = 50; 
  directoryContent: string = this.platform === 'WIN' ? '/www' : '/htdocs';
  showPermissions: boolean = false; 
  showSshCheckbox: boolean = false; 
  isDefaultUser: boolean = false; 
  showWarning: boolean = false;
  ftpAccount = {
    id: 1,
    domainAlias: 'q103187cf.netsolhost.com',
    username: 'anananananan123_',
    password: 'adasdsa',
    description: '',
    relativePath: '/htdocs',
    sshAccessEnabled: false
  }; // Mock ftpAccountModel

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      id: [this.ftpAccount.id],
      domainAlias: [{ value: this.ftpAccount.domainAlias, disabled: true }],
      username: [this.ftpAccount.username, [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_%]+$/)
      ]],
      password: ['', [
        Validators.minLength(6),
        Validators.maxLength(16),
        this.complexPasswordValidator()
      ]],
      confirmPassword: [''],
      description: [this.ftpAccount.description],
      relativePath: [{ value: this.ftpAccount.relativePath, disabled: this.isDefaultUser }],
      sshAccess: [this.ftpAccount.sshAccessEnabled],
      permission: [''],
      primary: [false]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        // TODO: Fetch account details from service
        this.editForm.patchValue({
          id: parseInt(id, 10),
          domainAlias: this.ftpAccount.domainAlias,
          username: this.ftpAccount.username,
          password: this.ftpAccount.password,
          confirmPassword: this.ftpAccount.password,
          description: this.ftpAccount.description,
          relativePath: this.ftpAccount.relativePath,
          sshAccess: this.ftpAccount.sshAccessEnabled
        });
        this.isDefaultUser = false; // Mock; update from service
      }
    });
  }

  complexPasswordValidator() {
    return (control: any) => {
      const value = control.value || '';
      if (!value) return null; // Optional password
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecial = /[^A-Za-z0-9]/.test(value);
      const categories = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
      return categories >= 3 ? null : { complexPassword: true };
    };
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (!password && !confirmPassword) return null; // Optional password
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      console.log('Form submitted:', this.editForm.getRawValue());
      // TODO: Call HTTP service to POST to /ftpaccounts/edit_handler
      this.router.navigate(['/material']);
    } else {
      this.showWarning = true;
    }
  }

  onCancel(): void {
    this.router.navigate(['/ftp-manager']);
  }

  onPermissionsSubmit(): void {
    console.log('Permissions submitted:', this.editForm.getRawValue());
    // TODO: Call HTTP service to POST to /ftpaccounts/edit_permissions
  }
}