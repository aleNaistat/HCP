import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-awstats',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterModule
  ],
  templateUrl: './awstats.component.html',
  styleUrls: ['./awstats.component.scss']
})
export class AwstatsComponent implements OnInit {
  status: string = 'Yeah'; // Mock status
  message: string = ''; // Mock ${msg}
  displayedColumns: string[] = ['title', 'status'];
  dataSource = [{ title: 'Status', status: this.status }];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // TODO: Fetch AWStats status from service
    if (this.message) {
      this.snackBar.open(this.message, 'Close', { duration: 5000 });
    }
  }
}