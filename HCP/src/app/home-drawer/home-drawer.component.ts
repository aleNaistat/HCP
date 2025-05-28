import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-home-drawer',
  imports: [CommonModule, MatExpansionModule], 

  templateUrl: './home-drawer.component.html',
  styleUrl: './home-drawer.component.scss'
})

export class HomeDrawerComponent {
 @Input() section: any;

 isPanelExpanded = false; // Initial state - closed
  
 togglePanel() {
   this.isPanelExpanded = !this.isPanelExpanded;
 }
  
 constructor(public router: Router) {
    console.log('HomeDrawerComponent initialized with section:', this.section);
    // Initialization logic can go here if needed
  }
  navigateToTool(toolUrl: any) {
    this.router.navigate([toolUrl]);
  };
  
  
  ngOnInit() {
    console.log('HomeDrawerComponent ngOnInit called with section:', this.section);
  }
  ngOnChanges() {   
    console.log('HomeDrawerComponent ngOnChanges called with section:', this.section);  
  }
}
