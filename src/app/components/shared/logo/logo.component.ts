import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <img 
      src="assets/gam-docs-logo.png" 
      alt="GAM Docs" 
      [class]="getClasses()">
  `
})
export class LogoComponent {
  @Input() heightClass: string = 'h-12';
  @Input() variant: 'default' | 'white' | 'sidebar' = 'default';
  @Input() customClass: string = '';

  getClasses(): string {
    const base = 'w-auto object-contain transition-all duration-300';
    
    const variants = {
      default: '',
      white: 'brightness-0 invert opacity-90 hover:opacity-100', // For dark backgrounds
      sidebar: 'drop-shadow-md' // For sidebar
    };

    return `${base} ${this.heightClass} ${variants[this.variant]} ${this.customClass}`;
  }
}

