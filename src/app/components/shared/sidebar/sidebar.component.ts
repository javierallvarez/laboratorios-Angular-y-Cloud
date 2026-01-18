import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RippleModule, LogoComponent],
  template: `
    <aside class="w-64 bg-gradient-to-br from-primary-600 to-secondary-600 shadow-xl border-r border-primary-700 fixed h-screen overflow-y-auto z-50">
      <!-- Logo and title -->
      <div class="px-8 py-3 border-b border-white/10 flex justify-center items-center">
        <app-logo heightClass="max-h-44" variant="sidebar"></app-logo>
      </div>

      <!-- Category navigation -->
      <nav class="p-4">
        <h3 class="text-xs font-bold text-primary-200 uppercase tracking-wider mb-3 px-2">
          Categories
        </h3>
        <ul class="space-y-1">
          <li *ngFor="let category of categories">
            <button
              (click)="selectCategory(category)"
              [ngClass]="{
                'bg-white text-primary-700 shadow-lg': selectedCategory === category,
                'text-primary-100 hover:bg-white/10 hover:text-white': selectedCategory !== category
              }"
              class="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group border-0 cursor-pointer"
              pRipple>
              <i 
                [class]="'pi ' + getCategoryIcon(category) + ' text-lg'"
                class="transition-transform group-hover:scale-110">
              </i>
              <span class="flex-1 text-left">{{ category }}</span>
              <i 
                *ngIf="selectedCategory === category"
                class="pi pi-check text-sm">
              </i>
            </button>
          </li>
        </ul>
      </nav>

      <!-- Useful links -->
      <div class="p-4 border-t border-white/10 mt-auto">
        <h3 class="text-xs font-bold text-primary-200 uppercase tracking-wider mb-3 px-2">
          Links
        </h3>
        <div class="space-y-2">
          <button
            (click)="navigateTo('/about')"
            class="w-full flex items-center space-x-2 px-3 py-2 text-sm text-primary-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-transparent bg-transparent cursor-pointer"
            pRipple>
            <i class="pi pi-info-circle"></i>
            <span>About GAM</span>
          </button>
          <button
            (click)="openLink('https://github.com/GAM-team/GAM')"
            class="w-full flex items-center space-x-2 px-3 py-2 text-sm text-primary-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-transparent bg-transparent cursor-pointer"
            pRipple>
            <i class="pi pi-github"></i>
            <span>GAM on GitHub</span>
          </button>
          <button
            (click)="openLink('https://admin.google.com')"
            class="w-full flex items-center space-x-2 px-3 py-2 text-sm text-primary-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-transparent bg-transparent cursor-pointer"
            pRipple>
            <i class="pi pi-google"></i>
            <span>Admin Console</span>
          </button>
        </div>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  @Input() categories: string[] = [];
  @Input() selectedCategory: string = 'All';
  @Output() onSelectCategory = new EventEmitter<string>();

  constructor(private router: Router) {}

  selectCategory(category: string) {
    this.onSelectCategory.emit(category);
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'All': 'pi-th-large',
      'Users': 'pi-users',
      'Groups': 'pi-sitemap',
      'Organization': 'pi-building',
      'Gmail': 'pi-envelope',
      'Drive': 'pi-folder-open'
    };
    return icons[category] || 'pi-circle';
  }

  openLink(url: string): void {
    window.open(url, '_blank');
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
