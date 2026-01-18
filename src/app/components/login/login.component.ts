import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonComponent } from '../shared/button/button.component';
import { PasswordInputComponent } from '../shared/password-input/password-input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonComponent,
    PasswordInputComponent,
    ToastModule
  ],
  providers: [MessageService],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-primary-50 to-secondary-50">
      <p-toast></p-toast>
      <div class="w-full max-w-lg px-4">
        <p-card styleClass="shadow-2xl rounded-2xl overflow-hidden border-0">
          
          <div class="p-8">
            <!-- Header personalizado con espacio -->
            <div class="text-center mb-10 mt-2">
              <div class="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="pi pi-lock text-4xl text-primary-600"></i>
              </div>
              <h2 class="text-3xl font-bold text-gray-800">Admin Login</h2>
              <p class="text-gray-500 mt-2">Please sign in to access the dashboard</p>
            </div>

            <div class="flex flex-col gap-6">
              <div class="w-full relative">
                <input 
                  type="email" 
                  pInputText 
                  [(ngModel)]="email" 
                  class="w-full p-4 text-lg rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                  placeholder="Enter email" 
                />
              </div>

              <div class="w-full relative">
                <app-password-input 
                  [(ngModel)]="password"
                  placeholder="Enter password">
                </app-password-input>
              </div>

              <div class="space-y-3">
                <app-button 
                  label="Sign In" 
                  icon="pi pi-sign-in" 
                  [disabled]="!email || password.length < 2"
                  variant="primary"
                  [fullWidth]="true"
                  customClass="text-lg py-3 rounded-xl shadow-lg"
                  (onClick)="onLogin()">
                </app-button>
                
                <p class="text-xs text-center transition-colors duration-300" 
                   [class.text-gray-400]="!email || password.length < 2"
                   [class.text-green-600]="email && password.length >= 2">
                  <i class="pi" [class.pi-info-circle]="!email || password.length < 2" [class.pi-check-circle]="email && password.length >= 2"></i>
                  {{ (!email || password.length < 2) ? 'Enter email and password to login' : 'Ready to sign in' }}
                </p>
              </div>
            </div>
          </div>
        </p-card>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  onLogin() {
    if (this.authService.login(this.email, this.password)) {
      this.messageService.add({ severity: 'success', summary: 'Welcome', detail: 'Logged in as Admin' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid credentials' });
    }
  }
}
