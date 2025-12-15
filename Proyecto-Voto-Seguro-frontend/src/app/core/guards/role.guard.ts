import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['role'] as string;
  const userRole = authService.getUserRole();

  if (userRole === expectedRole) {
    return true;
  }

  // Redirigir según el rol
  if (userRole === 'admin') {
    router.navigate(['/admin/dashboard']);
  } else if (userRole === 'user') {
    router.navigate(['/my-tasks']);
  } else {
    router.navigate(['/login']);
  }

  return false;
};
