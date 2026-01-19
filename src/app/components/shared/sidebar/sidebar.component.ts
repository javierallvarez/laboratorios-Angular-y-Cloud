import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { LogoComponent } from '../logo/logo.component';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RippleModule, LogoComponent, TooltipModule],
  template: `
    <!-- Mobile Overlay -->
    <div 
      *ngIf="isMobileOpen" 
      (click)="closeMobile()"
      class="fixed inset-0 bg-gray-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity">
    </div>

    <aside 
      class="fixed h-screen bg-gradient-to-br from-primary-600 to-secondary-600 shadow-xl border-r border-primary-700 z-50 transition-all duration-300 ease-in-out overflow-y-auto flex flex-col"
      [ngClass]="{
        'w-64': !collapsed,
        'w-20': collapsed,
        'translate-x-0': isMobileOpen,
        '-translate-x-full lg:translate-x-0': !isMobileOpen
      }">
      
      <!-- Logo area -->
      <div class="px-4 py-3 border-b border-white/10 flex justify-center items-center h-20 relative transition-all">
        <!-- Full Logo -->
        <div *ngIf="!collapsed" class="fade-in">
          <app-logo heightClass="max-h-16" variant="sidebar"></app-logo>
        </div>
        <!-- Collapsed Icon/Logo -->
        <div *ngIf="collapsed" class="fade-in">
          <img src="assets/gam-docs-favicon.png" alt="G" class="w-10 h-10 cursor-pointer" (click)="goHome()">
        </div>

        <!-- Close button (Mobile only) -->
        <button 
          (click)="closeMobile()"
          class="lg:hidden absolute right-2 top-2 text-white/70 hover:text-white p-2">
          <i class="pi pi-times"></i>
        </button>
      </div>

      <!-- Category navigation -->
      <nav class="p-3 flex-1 overflow-y-auto custom-scrollbar">
        <h3 
          *ngIf="!collapsed"
          class="text-xs font-bold text-primary-200 uppercase tracking-wider mb-3 px-2 fade-in whitespace-nowrap">
          Categories
        </h3>
        <!-- Separator for collapsed mode -->
        <div *ngIf="collapsed" class="h-px bg-white/10 mx-2 mb-3"></div>

        <ul class="space-y-1">
          <li *ngFor="let category of categories">
            <button
              (click)="selectCategory(category)"
              [pTooltip]="collapsed ? category : ''"
              tooltipPosition="right"
              [ngClass]="{
                'bg-white text-primary-700 shadow-lg': selectedCategory === category,
                'text-primary-100 hover:bg-white/10 hover:text-white': selectedCategory !== category,
                'justify-center px-0': collapsed,
                'px-4 space-x-3': !collapsed
              }"
              class="w-full flex items-center py-3 rounded-xl font-medium transition-all duration-200 group border-0 cursor-pointer relative overflow-hidden"
              pRipple>
              <i 
                [class]="'pi ' + getCategoryIcon(category) + ' text-lg'"
                class="transition-transform group-hover:scale-110 flex-shrink-0">
              </i>
              <span *ngIf="!collapsed" class="flex-1 text-left whitespace-nowrap fade-in">{{ category }}</span>
              <i 
                *ngIf="!collapsed && selectedCategory === category"
                class="pi pi-check text-sm fade-in">
              </i>
              <!-- Active indicator dot for collapsed mode -->
              <div *ngIf="collapsed && selectedCategory === category" class="absolute right-1 top-1 w-2 h-2 bg-secondary-400 rounded-full"></div>
            </button>
          </li>
        </ul>
      </nav>

      <!-- Useful links -->
      <div class="p-3 border-t border-white/10 bg-black/10">
        <h3 
          *ngIf="!collapsed"
          class="text-xs font-bold text-primary-200 uppercase tracking-wider mb-3 px-2 fade-in whitespace-nowrap">
          Links
        </h3>
        <div class="space-y-2">
          <button
            (click)="navigateTo('/about')"
            [pTooltip]="collapsed ? 'About GAM' : ''"
            tooltipPosition="right"
            [ngClass]="{'justify-center': collapsed, 'space-x-2 px-3': !collapsed}"
            class="w-full flex items-center py-2 text-sm text-primary-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-transparent bg-transparent cursor-pointer"
            pRipple>
            <i class="pi pi-info-circle text-lg"></i>
            <span *ngIf="!collapsed" class="whitespace-nowrap fade-in">About GAM</span>
          </button>
          <!-- More links... could be refactored to loop but explicit is fine -->
          <button
            (click)="openLink('https://github.com/GAM-team/GAM')"
            [pTooltip]="collapsed ? 'GAM GitHub' : ''"
            tooltipPosition="right"
            [ngClass]="{'justify-center': collapsed, 'space-x-2 px-3': !collapsed}"
            class="w-full flex items-center py-2 text-sm text-primary-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-transparent bg-transparent cursor-pointer"
            pRipple>
            <i class="pi pi-github text-lg"></i>
            <span *ngIf="!collapsed" class="whitespace-nowrap fade-in">GitHub</span>
          </button>
          <button
            (click)="openLink('https://admin.google.com')"
            [pTooltip]="collapsed ? 'Admin Console' : ''"
            tooltipPosition="right"
            [ngClass]="{'justify-center': collapsed, 'space-x-2 px-3': !collapsed}"
            class="w-full flex items-center py-2 text-sm text-primary-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-transparent bg-transparent cursor-pointer"
            pRipple>
            <i class="pi pi-google text-lg"></i>
            <span *ngIf="!collapsed" class="whitespace-nowrap fade-in">Admin Console</span>
          </button>
        </div>

        <!-- Desktop Collapse Toggle -->
        <button 
          (click)="toggleCollapse()"
          class="hidden lg:flex w-full items-center justify-center py-3 mt-2 text-primary-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer border-t border-white/5">
          <i [class]="collapsed ? 'pi pi-angle-double-right' : 'pi pi-angle-double-left'"></i>
        </button>
      </div>
    </aside>
  `,
  styles: [`
    .fade-in {
      animation: fadeIn 0.3s ease-in;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    /* Hide scrollbar for cleaner look */
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
    }
  `]
})
export class SidebarComponent {
  @Input() categories: string[] = [];
  @Input() selectedCategory: string = 'All';
  @Input() collapsed: boolean = false;
  @Input() isMobileOpen: boolean = false;
  
  @Output() onSelectCategory = new EventEmitter<string>();
  @Output() onToggleCollapse = new EventEmitter<boolean>();
  @Output() onMobileClose = new EventEmitter<void>();

  constructor(private router: Router) {}

  selectCategory(category: string) {
    this.onSelectCategory.emit(category);
    this.closeMobile(); // Auto-close on mobile selection
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.onToggleCollapse.emit(this.collapsed);
  }

  closeMobile() {
    this.onMobileClose.emit();
  }

  goHome() {
    this.router.navigate(['/']);
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
    this.closeMobile();
  }
}
