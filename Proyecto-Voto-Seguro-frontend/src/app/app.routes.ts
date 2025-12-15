import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/public/landing/landing').then(m => m.Landing)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/public/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/public/register/register').then(m => m.Register)
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/admin/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'tasks',
        loadComponent: () => import('./features/admin/task-list/task-list').then(m => m.TaskList)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/admin/user-list/user-list').then(m => m.UserList)
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/admin/reports/reports').then(m => m.Reports)
      }
    ]
  },
  {
    path: 'my-tasks',
    canActivate: [authGuard, roleGuard],
    data: { role: 'user' },
    loadComponent: () => import('./features/user/my-task/my-tasks').then(m => m.MyTasks)
  },
  { path: '**', redirectTo: '' }
];
