import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';
import { RestaurantService } from '../services/restaurant.service';
import { DeliverypartnerService } from '../services/deliverypartner.service';

export const authGuard: CanActivateFn = (route, state) => {
  const currentmenu = route.url[0].path;
  const router = inject(Router);
  const userservice = inject(UserserviceService);
  const restaurantservice = inject(RestaurantService);
  const deliveryservice = inject(DeliverypartnerService)

  if (userservice.haveaccess() && restaurantservice.haveaccess()) {
    return true;
  }
  
  else {
    alert('please login/register');
    router.navigate(['']);
    return false;
  }
};
