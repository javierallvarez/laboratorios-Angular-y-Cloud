import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule],
  template: `
    <p-button 
      [label]="label" 
      [icon]="icon" 
      [type]="type"
      [disabled]="disabled"
      (onClick)="handleClick()"
      [styleClass]="getClasses()"
      [pTooltip]="tooltip"
      [tooltipPosition]="tooltipPosition">
    </p-button>
  `
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() tooltip: string = '';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() customClass: string = '';

  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }

  getClasses(): string {
    const baseClasses = 'flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-200 border-0';
    
    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-200',
      secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm',
      danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-200',
      ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 shadow-none'
    };

    const widthClass = this.fullWidth ? 'w-full' : '';
    const disabledClass = this.disabled ? 'opacity-60 cursor-not-allowed shadow-none' : 'cursor-pointer';

    return `${baseClasses} ${variants[this.variant]} ${widthClass} ${disabledClass} ${this.customClass}`;
  }
}

