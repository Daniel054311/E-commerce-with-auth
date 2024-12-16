import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Role } from '../../features/models/user.roles';
import { AuthService } from '../service/auth.service';

export const checkUserRolesGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const user = authService.currentUser();
  if (user && user.role !== Role.SELLER) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};

