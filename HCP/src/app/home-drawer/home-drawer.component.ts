import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';

@Component({
  selector: 'app-home-drawer',
  imports: [CommonModule], 

  templateUrl: './home-drawer.component.html',
  styleUrl: './home-drawer.component.scss'
})

export class HomeDrawerComponent {
 @Input() section: any;
}
