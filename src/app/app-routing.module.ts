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

const routes: Routes = [
  {
    path : "",
    component : LandingpageComponent
  },
  {
    path : "home",
    component : HomeComponent,
    children : [
      {
        path: "",
        redirectTo : "restaurants/delhi",
        pathMatch : 'full'
      },
      {
        path : "profile",
        component : ProfileComponent
      },
      {
        path : "restaurants/:location",
        component : RestaurantsDisplayComponent
      },
      {
        path : "restaurants/:location/restaurant/:id",
        component : RestaurantmenuComponent
      },
      {
        path : "cart",
        component : CartComponent
        
      },
      {
        path : "checkout",
        component : DeliveryComponent
      },
      {
        path : "favourites",
        component : FavouritesComponent
      },
      {
        path : "trackorder",
        component : TrackingComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
