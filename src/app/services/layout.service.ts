import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private _isSidebarCollapsed = new BehaviorSubject<boolean>(false);
  isSidebarCollapsed$ = this._isSidebarCollapsed.asObservable();

  private _isMobileSidebarOpen = new BehaviorSubject<boolean>(false);
  isMobileSidebarOpen$ = this._isMobileSidebarOpen.asObservable();

  constructor() {
    // Load persisted state from localStorage
    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved) {
      this._isSidebarCollapsed.next(JSON.parse(saved));
    }
  }

  toggleSidebar() {
    const newState = !this._isSidebarCollapsed.value;
    this._isSidebarCollapsed.next(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  }

  setSidebarCollapsed(collapsed: boolean) {
    this._isSidebarCollapsed.next(collapsed);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  }

  toggleMobileSidebar() {
    this._isMobileSidebarOpen.next(!this._isMobileSidebarOpen.value);
  }

  closeMobileSidebar() {
    this._isMobileSidebarOpen.next(false);
  }
}

