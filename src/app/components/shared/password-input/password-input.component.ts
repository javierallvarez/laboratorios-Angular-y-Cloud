import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [CommonModule, FormsModule, PasswordModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true
    }
  ],
  template: `
    <div class="w-full relative password-wrapper">
      <p-password 
        [(ngModel)]="value" 
        [feedback]="feedback" 
        styleClass="w-full"
        [inputStyleClass]="getInputClasses()"
        [placeholder]="placeholder"
        (ngModelChange)="onModelChange($event)"
        (onBlur)="onTouched()">
      </p-password>
    </div>
  `,
  styles: [`
    :host ::ng-deep .p-password {
      width: 100%;
    }
    :host ::ng-deep .p-password-input {
      width: 100%;
    }
  `]
})
export class PasswordInputComponent implements ControlValueAccessor {
  @Input() placeholder: string = 'Enter password';
  @Input() feedback: boolean = false;
  @Input() customClass: string = '';
  
  value: string = '';
  
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onModelChange(val: string) {
    this.onChange(val);
  }

  getInputClasses(): string {
    const base = 'w-full p-4 pr-14 text-lg rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none';
    return `${base} ${this.customClass}`;
  }
}

