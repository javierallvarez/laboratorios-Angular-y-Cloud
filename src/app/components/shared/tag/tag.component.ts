import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="getClasses()">
      <i *ngIf="icon" [class]="icon + ' text-current mr-2'"></i>
      <span *ngIf="prefix" class="opacity-70 mr-0.5">{{ prefix }}</span>
      {{ label }}
    </span>
  `
})
export class TagComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() prefix: string = ''; 
  @Input() variant: 'default' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'contrast' = 'default';
  @Input() shape: 'rounded' | 'pill' = 'pill'; 
  @Input() customClass: string = '';

  getClasses(): string {
    const base = 'inline-flex items-center justify-center font-semibold transition-all duration-200 border text-sm';
    
    const variants = {
      default: 'bg-gray-100 text-gray-700 border-gray-200',
      primary: 'bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 border-primary-200', 
      secondary: 'bg-gray-50 text-gray-600 border-gray-200',
      info: 'bg-secondary-50 text-secondary-700 border-secondary-200', 
      success: 'bg-green-50 text-green-700 border-green-200',
      warning: 'bg-orange-50 text-orange-700 border-orange-200',
      danger: 'bg-red-50 text-red-700 border-red-200',
      contrast: 'bg-gray-900 text-white border-gray-900'
    };

    const shapes = {
      pill: 'rounded-full px-4 py-1', 
      rounded: 'rounded-lg px-3 py-1'
    };

    return `${base} ${variants[this.variant]} ${shapes[this.shape]} ${this.customClass}`;
  }
}

