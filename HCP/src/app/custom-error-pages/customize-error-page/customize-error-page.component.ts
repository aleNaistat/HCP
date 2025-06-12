import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';



export interface errorsType {
  position: number;
  title: string;
  current: string;
  link: string;
}

const ELEMENT_DATA: errorsType[] = [
  {position: 1, title: 'Page:', current: '/htdocs/customerrors/400.html', link: ''},
  {position: 2, title: 'Error message:', current: 'Your browser sent a request that this server could not understand.', link: ''},
  {position: 3, title: "'Return to' text:", current: 'Return to our homepage', link: ''},
  {position: 4, title: "'Return to' URL:", current: 'Default', link: ''},
];

@Component({
  selector: 'app-customize-error-page',
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatTableModule, MatInputModule],
  templateUrl: './customize-error-page.component.html',
  styleUrl: './customize-error-page.component.scss'
})

export class CustomizeErrorPageComponent {
  displayedColumns: string[] = ['errorType', 'current', 'options'];
  dataSource = ELEMENT_DATA;
}
