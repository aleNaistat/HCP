import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, Location } from '@angular/common';
import { OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { FormsModule } from '@angular/forms';


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
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatTableModule, MatInputModule, FormsModule],
  templateUrl: './customize-error-page.component.html',
  styleUrl: './customize-error-page.component.scss'
})

export class CustomizeErrorPageComponent implements OnInit {
  displayedColumns: string[] = ['errorType', 'current'];
  dataSource = ELEMENT_DATA;
  errorType: string;
  urlString: string;
  maxCharacters: number = 500;

  fieldValues: { [key: string]: string } = {
    'Error message:': 'Your browser sent a request that this server could not understand.',
    "'Return to' text:": 'Return to our homepage',
    "'Return to' URL:": 'Default'
  };

  constructor(private route: ActivatedRoute, private location: Location) {}

  convertErrorToPath(errorString) {
    const errorCode = errorString.match(/\d+/);
    if (errorCode) {
      return `/htdocs/customerrors/${errorCode[0]}.html`;
    }
    return '/htdocs/customerrors/error.html';
  }

  initializeFieldValues() {
    ELEMENT_DATA.forEach(item => {
      if (this.fieldValues.hasOwnProperty(item.title)) {
        this.fieldValues[item.title] = item.current;
      }
    });
  }

  ngOnInit() {
    // Get the errorType parameter
    this.errorType = this.route.snapshot.paramMap.get('errorType');
    this.urlString = this.convertErrorToPath(this.errorType);
    console.log('Error Type:', this.urlString);
    this.initializeFieldValues();
  }

  onFieldChange(event: any, fieldTitle: string): void {
    const value = event.target.value;
    if (value.length <= this.maxCharacters) {
      this.fieldValues[fieldTitle] = value;
    } else {
      this.fieldValues[fieldTitle] = value.substring(0, this.maxCharacters);
      event.target.value = this.fieldValues[fieldTitle];
    }
  }

  getRemainingCharacters(fieldTitle: string): number {
    return this.maxCharacters - (this.fieldValues[fieldTitle]?.length || 0);
  }

  getFieldValue(fieldTitle: string): string {
    return this.fieldValues[fieldTitle] || '';
  }
  
  goBack(): void {
    this.location.back();
  }
}