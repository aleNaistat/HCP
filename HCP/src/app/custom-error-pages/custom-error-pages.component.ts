import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router'; // Add this import

export interface errorsType {
  position: number;
  errorType: string;
  current: string;
  link: string;
}

const ELEMENT_DATA: errorsType[] = [
  {position: 1, errorType: '400   Bad Request', current: 'Default', link: 'Customize'},
  {position: 2, errorType: '401   You are not authorized to view this page', current: 'Default', link: 'Customize'},
  {position: 3, errorType: '403   Access Denied', current: 'Default', link: 'Customize'},
  {position: 4, errorType: '404   Page Not Found', current: 'Default', link: 'Customize'},
  {position: 5, errorType: '500   Internal Server Error', current: 'Default', link: 'Customize'},
];

@Component({
  selector: 'app-custom-error-pages',
  imports: [ MatCardModule, MatTableModule, RouterLink ],
  templateUrl: './custom-error-pages.component.html',
  styleUrl: './custom-error-pages.component.scss'
})

export class CustomErrorPagesComponent {
  constructor(private router: Router) {}
  displayedColumns: string[] = ['errorType', 'current', 'options'];
  dataSource = ELEMENT_DATA;
}
