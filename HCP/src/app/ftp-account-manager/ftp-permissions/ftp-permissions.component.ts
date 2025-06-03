import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { EditFtpAccountComponent } from '../edit-ftp-account/edit-ftp-account.component';

@Component({
  selector: 'app-ftp-permissions',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    RouterModule,
    EditFtpAccountComponent
  ],
  templateUrl: './ftp-permissions.component.html',
  styleUrls: ['./ftp-permissions.component.scss']
})
export class FtpPermissionsComponent implements OnInit {
  permissionsForm: FormGroup;
  platform: string = 'UNIX'; // Mock platform
  serverType: string = 'UNIX'; // Mock serverType (UNIX or WIN2K8)
  activeQuantity: number = 2; // Mock serviceDetail.activeQuantity
  limit: number = 50; // Mock serviceDetail.limit
  ftpAccount = {
    id: 1,
    username: 'user1',
    relativePath: '/htdocs',
    ftpAccountPermission: {
      read: true,
      append: false,
      write: true,
      delete: false,
      execute: false,
      list: true,
      remove: false,
      make: false,
      inherit: false,
      readWrite: false,
      readWriteDelete: false,
      none: false
    }
  }; // Mock ftpAccountModel
  showTipSection: boolean = true; // Mock showTIPSection

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.permissionsForm = this.fb.group({
      read: [this.ftpAccount.ftpAccountPermission.read],
      append: [this.ftpAccount.ftpAccountPermission.append],
      write: [this.ftpAccount.ftpAccountPermission.write],
      delete: [this.ftpAccount.ftpAccountPermission.delete],
      execute: [this.ftpAccount.ftpAccountPermission.execute],
      list: [this.ftpAccount.ftpAccountPermission.list],
      remove: [this.ftpAccount.ftpAccountPermission.remove],
      make: [this.ftpAccount.ftpAccountPermission.make],
      inherit: [this.ftpAccount.ftpAccountPermission.inherit],
      permissionwin: [''],
      id: [this.ftpAccount.id],
      username: [this.ftpAccount.username],
      relativePath: [this.ftpAccount.relativePath]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        // TODO: Fetch account permissions from service
        this.permissionsForm.patchValue({
          id: parseInt(id, 10),
          username: this.ftpAccount.username,
          relativePath: this.ftpAccount.relativePath,
          read: this.ftpAccount.ftpAccountPermission.read,
          append: this.ftpAccount.ftpAccountPermission.append,
          write: this.ftpAccount.ftpAccountPermission.write,
          delete: this.ftpAccount.ftpAccountPermission.delete,
          execute: this.ftpAccount.ftpAccountPermission.execute,
          list: this.ftpAccount.ftpAccountPermission.list,
          remove: this.ftpAccount.ftpAccountPermission.remove,
          make: this.ftpAccount.ftpAccountPermission.make,
          inherit: this.ftpAccount.ftpAccountPermission.inherit,
          permissionwin: this.getWindowsPermission()
        });
      }
    });
  }

  getWindowsPermission(): string {
    if (this.ftpAccount.ftpAccountPermission.readWriteDelete) return '001';
    if (this.ftpAccount.ftpAccountPermission.readWrite) return '010';
    if (this.ftpAccount.ftpAccountPermission.read) return '100';
    if (this.ftpAccount.ftpAccountPermission.none) return '000';
    return '';
  }

  onSubmit(): void {
    if (this.permissionsForm.valid) {
      console.log('Permissions submitted:', this.permissionsForm.value);
      // TODO: Call HTTP service to POST to /ftpaccounts/edit_permissions_handler
      this.router.navigate(['/material']);
    }
  }

  onCancel(): void {
    console.log('Cancelled');
    this.router.navigate(['/material']);
  }
}