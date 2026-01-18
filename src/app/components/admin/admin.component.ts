import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GamCommandsService } from '../../services/gam-commands.service';
import { GamCommand } from '../../models/gam-command.model';
import { AuthService } from '../../services/auth.service';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonComponent } from '../shared/button/button.component';
import { TerminalBlockComponent } from '../shared/terminal-block/terminal-block.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    ButtonComponent,
    TerminalBlockComponent,
    DropdownModule,
    ChipsModule,
    ToastModule,
    DividerModule,
    ToolbarModule
  ],
  providers: [MessageService],
  styles: [`
    :host ::ng-deep .p-dropdown {
      width: 100%;
      border-radius: 0.5rem; /* rounded-lg */
      border: 1px solid #d1d5db; /* border-gray-300 */
    }
    :host ::ng-deep .p-dropdown .p-dropdown-label {
      padding: 0.75rem; /* p-3 */
    }
    :host ::ng-deep .p-inputtext {
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
    }
    /* Ensure chips input also matches if needed */
    :host ::ng-deep .p-chips {
      display: block;
      width: 100%;
    }
    :host ::ng-deep .p-chips .p-chips-multiple-container {
      width: 100%;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      padding: 0.5rem;
    }
    :host ::ng-deep .p-chips .p-chips-input-token {
      flex: 1 1 auto;
    }
    :host ::ng-deep .p-chips .p-chips-input-token input {
      width: 100%;
    }
  `],
  template: `
    <div class="min-h-screen bg-gray-50 pb-20">
      <p-toast></p-toast>
      
      <!-- Top Bar -->
      <div class="bg-white shadow-sm border-b border-primary-200 sticky top-0 z-50">
        <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="bg-primary-100 text-primary-600 p-2 rounded-lg">
              <i class="pi pi-cog text-xl"></i>
            </div>
            <div>
              <h1 class="text-xl font-bold text-primary-950">Admin Dashboard</h1>
              <p class="text-xs text-primary-500">Manage your command library</p>
            </div>
          </div>
          <div class="flex gap-2 items-center">
            <div class="hidden md:flex items-center gap-2 px-3 py-1 bg-primary-50 rounded-full border border-primary-100 mr-2" *ngIf="currentUser">
              <i class="pi pi-user text-primary-600"></i>
              <span class="text-sm font-medium text-primary-800 capitalize">Welcome, {{ currentUser!.split('@')[0] }}</span>
            </div>
            <app-button 
              label="Back to App" 
              icon="pi pi-arrow-left" 
              variant="secondary"
              (onClick)="goHome()">
            </app-button>
            <app-button 
              icon="pi pi-sign-out" 
              variant="secondary"
              tooltip="Logout"
              tooltipPosition="bottom"
              customClass="w-10 h-10 !px-0 rounded-full flex items-center justify-center"
              (onClick)="logout()">
            </app-button>
          </div>
        </div>
      </div>

      <div class="max-w-5xl mx-auto mt-8 px-6">
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Left Column: Form -->
          <div class="lg:col-span-2 space-y-6">
            <div class="bg-white rounded-2xl shadow-sm border border-primary-200 p-8">
              <h2 class="text-lg font-bold text-primary-900 mb-6 flex items-center">
                <i class="pi pi-plus-circle text-primary-600 mr-2"></i>
                Create New Command
              </h2>

              <div class="space-y-6">
                <!-- Title & Category Row -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="flex flex-col gap-2">
                    <label class="font-bold text-sm text-primary-700">Command Title <span class="text-red-500">*</span></label>
                    <input pInputText [(ngModel)]="newCommand.title" placeholder="e.g. Delete unused groups" class="w-full p-3" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="font-bold text-sm text-primary-700">Category <span class="text-red-500">*</span></label>
                    <p-dropdown 
                      [options]="categories" 
                      [(ngModel)]="newCommand.category" 
                      [editable]="true"
                      placeholder="Select or type category"
                      styleClass="w-full">
                    </p-dropdown>
                  </div>
                </div>

                <!-- Command Input -->
                <div class="flex flex-col gap-2">
                  <label class="font-bold text-sm text-primary-700">GAM Command <span class="text-red-500">*</span></label>
                  <div class="relative">
                    <i class="pi pi-terminal absolute left-4 top-4 text-primary-400"></i>
                    <input pInputText [(ngModel)]="newCommand.command" placeholder="gam print groups..." class="w-full p-3 font-mono bg-primary-50" />
                  </div>
                </div>

                <!-- Description -->
                <div class="flex flex-col gap-2">
                  <label class="font-bold text-sm text-primary-700">Description</label>
                  <textarea pInputTextarea [(ngModel)]="newCommand.description" rows="3" class="w-full p-3 text-base" placeholder="What does this command do?"></textarea>
                </div>

                <!-- Tags -->
                <div class="flex flex-col gap-2">
                  <label class="font-bold text-sm text-primary-700">Tags</label>
                  <p-chips [(ngModel)]="newCommand.tags" separator="," placeholder="security, groups, audit (press enter)" styleClass="w-full" inputStyleClass="w-full p-3 text-base"></p-chips>
                  <small class="text-primary-500">Press enter to add multiple tags</small>
                </div>
              </div>
            </div>

            <!-- Output Example Section -->
            <div class="bg-white rounded-2xl shadow-sm border border-primary-200 p-8">
              <h2 class="text-lg font-bold text-primary-900 mb-6 flex items-center">
                <i class="pi pi-code text-secondary-600 mr-2"></i>
                Output Example
              </h2>

              <div class="space-y-6">
                <!-- Headers -->
                <div class="flex flex-col gap-2">
                  <label class="font-bold text-sm text-primary-700">Column Headers</label>
                  <p-chips [(ngModel)]="newCommand.example.headers" separator="," placeholder="Email, Status, Date" styleClass="w-full"></p-chips>
                </div>

                <!-- Output Text -->
                <div class="flex flex-col gap-2">
                  <label class="font-bold text-sm text-primary-700">Terminal Output</label>
                  <textarea 
                    pInputTextarea 
                    [(ngModel)]="newCommand.example.output" 
                    rows="8" 
                    class="w-full font-mono text-xs bg-primary-950 text-primary-100 border border-primary-800"
                    placeholder="User: homer.simpson@springfield.com...">
                  </textarea>
                </div>

                <!-- Preview -->
                <div class="flex flex-col gap-2" *ngIf="newCommand.example.output">
                  <label class="font-bold text-sm text-primary-700">Preview</label>
                  <app-terminal-block 
                    [content]="newCommand.example.output" 
                    title="Terminal Output" 
                    type="output">
                  </app-terminal-block>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-center gap-4 pt-4">
              <app-button 
                label="Save Command" 
                icon="pi pi-check" 
                variant="primary"
                customClass="px-8 shadow-primary-200"
                (onClick)="saveCommand()">
              </app-button>
            </div>
          </div>

          <!-- Right Column: Info & Stats -->
          <div class="lg:col-span-1 space-y-6">
            <!-- Tips Card -->
            <div class="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100">
              <h3 class="font-bold text-primary-900 mb-4 flex items-center">
                <i class="pi pi-info-circle mr-2"></i>
                Admin Tips
              </h3>
              <ul class="space-y-3 text-sm text-primary-800">
                <li class="flex items-start gap-2">
                  <i class="pi pi-check-circle mt-1 text-primary-500"></i>
                  <span>Commands are saved to your browser's local storage.</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="pi pi-check-circle mt-1 text-primary-500"></i>
                  <span>Use descriptive tags to make searching easier.</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="pi pi-check-circle mt-1 text-primary-500"></i>
                  <span>Paste real terminal output for better examples.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  `
})
export class AdminComponent implements OnInit {
  categories: string[] = [];
  currentUser: string | null = null;
  
  newCommand: GamCommand = {
    id: 0,
    title: '',
    command: '',
    description: '',
    category: '',
    tags: [],
    example: {
      headers: [],
      output: ''
    }
  };

  constructor(
    private gamService: GamCommandsService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.categories = this.gamService.getCategories();
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  saveCommand() {
    if (!this.newCommand.title || !this.newCommand.command) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Title and Command are required' });
      return;
    }

    if (!this.newCommand.category) {
       this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please select or type a category' });
       return;
    }

    const commandToAdd = JSON.parse(JSON.stringify(this.newCommand));
    
    this.gamService.addCommand(commandToAdd);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Command added successfully!' });
    
    this.newCommand = {
      id: 0,
      title: '',
      command: '',
      description: '',
      category: '',
      tags: [],
      example: {
        headers: [],
        output: ''
      }
    };
  }

  logout() {
    this.authService.logout();
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
