import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './user/login/login.component';
import { BannerComponent } from './landing/banner/banner.component';
import { AboutComponent } from './landing/about/about.component';
import { HomeComponent } from './components/home/home.component';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatInputModule} from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RestaurantsDisplayComponent } from './components/restaurants-display/restaurants-display.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { RestaurantmenuComponent } from './components/restaurantmenu/restaurantmenu.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CartComponent } from './components/cart/cart.component';
import { FooterComponent } from './landing/footer/footer.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import {MatProgressSpinner, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { OsmMapComponent } from './components/osm-map/osm-map.component';
// import { LeafletModule } from '@asymmetrik/ngx-leaflet';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BannerComponent,
    AboutComponent,
    HomeComponent,
    LandingpageComponent,
    ProfileComponent,
    RestaurantsDisplayComponent,
    RestaurantComponent,
    RestaurantmenuComponent,
    CartComponent,
    FooterComponent,
    DeliveryComponent,
    FavouritesComponent,
    TrackingComponent,
    OsmMapComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatSelectModule,
    MatTabsModule,
    ToastrModule.forRoot(),
    CommonModule,
    MatProgressSpinnerModule,
    
  ],
  providers: [ {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
