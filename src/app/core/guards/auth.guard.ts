import {isPlatformBrowser} from '@angular/common';
import {inject, PLATFORM_ID} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return router.createUrlTree(['/login']); // SSR → redirect login
  }

  // ✅ tout ce qui suit s'exécute UNIQUEMENT dans le browser
  const token = localStorage.getItem('token');

  if (token && isTokenValid(token)) return true;

  localStorage.removeItem('token');
  return router.createUrlTree(['/login']);
};

function isTokenValid(token: string): boolean {
  try {
    const parts = token.split('.');
    console.log('parts:', parts.length); // doit être 3

    const payload = JSON.parse(atob(parts[1]));
    console.log('payload:', payload);
    console.log('exp:', new Date(payload.exp * 1000));
    console.log('now:', new Date());
    console.log('valide?', Date.now() < payload.exp * 1000);

    return Date.now() < payload.exp * 1000;
  } catch (e) {
    console.error('token malformé:', e);
    return false;
  }
}
