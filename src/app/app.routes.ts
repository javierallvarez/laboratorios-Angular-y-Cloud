import { Routes } from '@angular/router';
import { CommandListComponent } from './components/command-list/command-list.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AboutComponent } from './components/about/about.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: CommandListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: ':category',
    component: CommandListComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
