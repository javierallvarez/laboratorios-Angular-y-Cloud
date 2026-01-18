import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ButtonComponent } from '../shared/button/button.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { GamCommandsService } from '../../services/gam-commands.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, CardModule, DividerModule, ButtonComponent, SidebarComponent],
  template: `
    <div class="flex min-h-screen bg-gradient-to-br from-gray-50 via-primary-50 to-secondary-50">
      <app-sidebar
        [categories]="categories"
        [selectedCategory]="''"
        (onSelectCategory)="onCategorySelect($event)">
      </app-sidebar>

      <main class="flex-1 ml-64 p-4">
        <div class="max-w-4xl mx-auto mt-8">
          <div class="mb-2">
            <h1 class="text-4xl font-bold text-gray-900 mb-2">About GAM</h1>
            <p class="text-gray-500 text-lg">Google Admin Manager</p>
          </div>

          <p-card styleClass="shadow-xl rounded-2xl overflow-hidden border-0 mb-8 bg-white/80 backdrop-blur-sm">
            <div class="p-8 space-y-8">
              <section>
                <div class="flex items-center gap-3 mb-4">
                  <i class="pi pi-info-circle text-2xl text-primary-600"></i>
                  <h2 class="text-2xl font-bold text-gray-800 m-0">What is GAM?</h2>
                </div>
                <p class="text-gray-700 text-lg leading-relaxed mb-4">
                  GAM (Google Admin Manager) is a command line tool for Google Workspace (formerly G Suite) administrators to manage domain and user settings quickly and easily.
                </p>
                <p class="text-gray-700 text-lg leading-relaxed">
                  It allows you to perform operations that are repetitive, complex, or impossible to do via the standard Google Admin Console web interface. From managing users, groups, and aliases to auditing Drive files and managing licenses.
                </p>
              </section>

              <p-divider></p-divider>

              <section>
                <div class="flex items-center gap-3 mb-4">
                  <i class="pi pi-compass text-2xl text-primary-600"></i>
                  <h2 class="text-2xl font-bold text-gray-800 m-0">Why use this documentation?</h2>
                </div>
                <p class="text-gray-700 text-lg leading-relaxed mb-4">
                  I (Javier) created this page to keep track of the commands I use most as an administrator. Given the vast volume of GAM commands available, I find it incredibly useful to document them here and add new ones as my needs evolve.
                </p>
                <p class="text-gray-700 text-lg leading-relaxed mb-4">
                  This project started as an Angular project for my participation in the <a href="https://lemoncode.net" target="_blank" class="text-primary-600 hover:text-primary-800 font-semibold underline transition-colors">Lemoncode Master Front End</a>.
                </p>
                <ul class="space-y-3 text-gray-700 text-lg">
                  <li class="flex items-start gap-3">
                    <i class="pi pi-check text-green-500 mt-1"></i>
                    <span>Quick access to command syntax.</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <i class="pi pi-check text-green-500 mt-1"></i>
                    <span>Real-world output examples.</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <i class="pi pi-check text-green-500 mt-1"></i>
                    <span>Categorized by function (Users, Groups, Drive, etc.).</span>
                  </li>
                </ul>
              </section>

              <p-divider></p-divider>

              <section>
                <div class="flex items-center gap-3 mb-6">
                  <i class="pi pi-external-link text-2xl text-primary-600"></i>
                  <h2 class="text-2xl font-bold text-gray-800 m-0">Official Resources</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <app-button 
                    label="Official GitHub" 
                    icon="pi pi-github" 
                    variant="secondary"
                    [fullWidth]="true"
                    (onClick)="openLink('https://github.com/GAM-team/GAM')">
                  </app-button>
                  <app-button 
                    label="GAM Wiki" 
                    icon="pi pi-book" 
                    variant="secondary"
                    [fullWidth]="true"
                    (onClick)="openLink('https://github.com/GAM-team/GAM/wiki')">
                  </app-button>
                  <app-button 
                    label="Mailing List" 
                    icon="pi pi-envelope" 
                    variant="secondary"
                    [fullWidth]="true"
                    (onClick)="openLink('https://groups.google.com/g/google-apps-manager')">
                  </app-button>
                </div>
              </section>
            </div>
          </p-card>
        </div>
      </main>
    </div>
  `
})
export class AboutComponent implements OnInit {
  categories: string[] = [];

  constructor(
    private router: Router,
    private gamService: GamCommandsService
  ) {}

  ngOnInit() {
    this.categories = this.gamService.getCategories();
  }

  onCategorySelect(category: string) {
    if (category === 'All') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/', category]);
    }
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
}

