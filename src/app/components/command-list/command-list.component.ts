import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GamCommandsService } from '../../services/gam-commands.service';
import { GamCommand } from '../../models/gam-command.model';
import { AuthService } from '../../services/auth.service';
import { LayoutService } from '../../services/layout.service';
import { CommandCardComponent } from '../command-card/command-card.component';
import { ButtonComponent } from '../shared/button/button.component';
import { TagComponent } from '../shared/tag/tag.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { LogoComponent } from '../shared/logo/logo.component';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AnimateModule } from 'primeng/animate';
import { MenuModule } from 'primeng/menu'; // Optional: for a dropdown menu if we wanted

@Component({
  selector: 'app-command-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CommandCardComponent,
    ButtonComponent,
    TagComponent,
    SidebarComponent,
    LogoComponent,
    CardModule,
    InputTextModule,
    ButtonModule,
    BadgeModule,
    RippleModule,
    AnimateModule,
    MenuModule
  ],
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.css']
})
export class CommandListComponent implements OnInit {
  commands: GamCommand[] = [];
  filteredCommands: GamCommand[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';
  searchQuery: string = '';
  isLoggedIn: boolean = false;
  currentUser: string | null = null;
  
  // Sidebar state
  isSidebarCollapsed: boolean = false;
  isMobileSidebarOpen: boolean = false;

  constructor(
    private gamCommandsService: GamCommandsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    // Subscribe to layout state
    this.layoutService.isSidebarCollapsed$.subscribe(collapsed => {
      this.isSidebarCollapsed = collapsed;
    });

    this.layoutService.isMobileSidebarOpen$.subscribe(open => {
      this.isMobileSidebarOpen = open;
    });

    // Subscribe to auth state
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    // Subscribe to commands changes
    this.gamCommandsService.commands$.subscribe(cmds => {
      this.commands = cmds;
      this.categories = ['All', ...this.gamCommandsService.getCategories()];
      this.applyFilters();
    });

    // Subscribe to route parameters
    this.route.paramMap.subscribe(params => {
      const categoryParam = params.get('category');
      
      if (categoryParam) {
        const matchedCategory = this.categories.find(c => 
          c.toLowerCase() === categoryParam.toLowerCase()
        );

        if (matchedCategory) {
          this.selectedCategory = matchedCategory;
        } else {
          this.selectedCategory = 'All';
        }
      } else {
        this.selectedCategory = 'All';
      }
      
      this.applyFilters();
    });
  }

  filterByCategory(category: string): void {
    if (category === 'All') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/', category.toLowerCase()]);
    }
  }

  onSearch(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    let result = this.commands;

    if (this.selectedCategory !== 'All') {
      result = result.filter(cmd => cmd.category === this.selectedCategory);
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(cmd =>
        cmd.title.toLowerCase().includes(query) ||
        cmd.command.toLowerCase().includes(query) ||
        cmd.description.toLowerCase().includes(query) ||
        cmd.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    this.filteredCommands = result;
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  // Auth methods
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToAdmin(): void {
    this.router.navigate(['/admin']);
  }

  logout(): void {
    this.authService.logout();
  }

  // Sidebar handlers
  onSidebarToggle(collapsed: boolean) {
    this.layoutService.setSidebarCollapsed(collapsed);
  }

  toggleMobileSidebar() {
    this.layoutService.toggleMobileSidebar();
  }

  closeMobileSidebar() {
    this.layoutService.closeMobileSidebar();
  }
}
