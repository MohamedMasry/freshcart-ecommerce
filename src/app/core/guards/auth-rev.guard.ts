import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authRevGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router);

  if (localStorage.getItem('userToken') != null) {
    _Router.navigate(['/home']);
    return false;
  }
  else {
    return true;
  }
};
