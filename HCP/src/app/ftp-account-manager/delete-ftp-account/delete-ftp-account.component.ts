import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-delete-ftp-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    RouterModule
  ],
  templateUrl: './delete-ftp-account.component.html',
  styleUrls: ['./delete-ftp-account.component.scss']
})
export class DeleteFtpAccountComponent implements OnInit {
  deleteForm: FormGroup;
  platform: string = 'UNIX'; // Mock platform (replace with service)
  activeQuantity: number = 2; // Mock serviceDetail.activeQuantity
  limit: number = 50; // Mock serviceDetail.limit
  ftpAccount = {
    id: 1,
    username: 'account1',
    relativePath: '/htdocs'
  }; // Mock ftpAccountModel
  displayedColumns: string[] = ['select', 'username', 'path'];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.deleteForm = this.fb.group({
      id: [this.ftpAccount.id],
      username: [this.ftpAccount.username],
      relativePath: [this.ftpAccount.relativePath]
    });
  }

  ngOnInit(): void {
    // Get account ID from route params (e.g., /delete-ftp-account/1)
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        // TODO: Fetch account details from service using ID
        this.deleteForm.patchValue({
          id: parseInt(id, 10),
          username: this.ftpAccount.username,
          relativePath: this.ftpAccount.relativePath
        });
      }
    });
  }

  onSubmit(): void {
    console.log('Delete confirmed:', this.deleteForm.value);
    // TODO: Call HTTP service to POST to /ftpaccounts/delete_handler
    // e.g., this.http.post('/ftpaccounts/delete_handler', this.deleteForm.value).subscribe();
  }

  onCancel(): void {
    console.log('Cancelled');
    // Navigate to FTP accounts list
    this.router.navigate(['/ftp-manager']);
  }
}