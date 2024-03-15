import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthapiService } from '../services/authapi.service';

export const resetPassGuard: CanActivateFn = (route, state) => {
  let _Router =  inject(Router);
  let _AuthapiService =  inject(AuthapiService);

  if(_AuthapiService.codeVerfied == true){
    return true;
  }
  else{
    _Router.navigate(['/home']);
    return false;
  }
};
