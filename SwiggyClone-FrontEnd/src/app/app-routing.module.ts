import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RestaurantsDisplayComponent } from './components/restaurants-display/restaurants-display.component';
import { RestaurantmenuComponent } from './components/restaurantmenu/restaurantmenu.component';
import { CartComponent } from './components/cart/cart.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { authGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path : "",
    component : LandingpageComponent
  },
  {
    path : "home",
    component : HomeComponent,
    canActivate :[authGuard],
    children : [
      {
        path: "",
        redirectTo : "restaurants/delhi",
        pathMatch : 'full',
        // canActivate :[authGuard],
      },
      {
        path : "profile",
        component : ProfileComponent,
        canActivate :[authGuard],
      },
      {
        path : "restaurants/:location",
        component : RestaurantsDisplayComponent,
        canActivate :[authGuard],
      },
      {
        path : "restaurants/:location/restaurant/:id",
        component : RestaurantmenuComponent,
        canActivate :[authGuard],
      },
      {
        path : "cart",
        component : CartComponent,
        canActivate :[authGuard],
        
      },
      {
        path : "checkout",
        component : DeliveryComponent,
        canActivate :[authGuard],
      },
      {
        path : "favourites",
        component : FavouritesComponent,
        canActivate :[authGuard],
      },
      {
        path : "trackorder",
        component : TrackingComponent,
        canActivate :[authGuard],
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
