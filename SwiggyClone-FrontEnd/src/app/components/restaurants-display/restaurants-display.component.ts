import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDaum, IRoot } from 'src/app/models/RestaurantsModels/RestaurantList';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-restaurants-display',
  templateUrl: './restaurants-display.component.html',
  styleUrls: ['./restaurants-display.component.css']
})
export class RestaurantsDisplayComponent implements OnInit {
  restaurantList! : IDaum[]
  tempList! : IDaum[]
  restaurants! : IRoot
  isClickedRating : boolean = false
  isClickedDelivery : boolean = false
  isClikcedVeg : boolean = false
  isLoading:boolean=true
  filter : string = ""
  constructor(private _userService: UserserviceService,
    private _restoservice : RestaurantService,
    public activatedRoute: ActivatedRoute,){
    
  }
  selected = "Banglore"
  ngOnInit(){
    if (this._userService.isLoggedIn === 1) {
      this._userService.GetUserDetails().subscribe((data) => {
        console.log(data);
      });
    }
    

    this.activatedRoute.params.subscribe((params) => {
      this.selected = params['location']
      this.currLocation();
    })
    
  }
  currLocation(){
    this.isClickedDelivery = false;
    this.isClickedRating = false;
    this.isClikcedVeg = false;
    console.log(this.selected)
    this._restoservice.getRestaurantsByLocation(this.selected,1).subscribe((data) => {
      this._restoservice.restaurantsList = data;
      this.restaurants = data;
      this.restaurantList = data.data
      this.tempList = this.restaurantList
      console.log(this.restaurantList);
      this.isLoading=false
    }
   ) ;
  }

  filterByRating(){
    this.isClickedRating = true;
    this.restaurantList.sort((r1 : IDaum,r2 : IDaum) => (r2.info.avgRating!) - r1.info.avgRating!);
    console.log(this.restaurantList)
  }
  filterByDeliveryTime(){
    this.isClickedDelivery = true;
    this.restaurantList.sort((r1 : IDaum,r2 : IDaum) => (r1.info.sla.deliveryTime) - r2.info.sla.deliveryTime);
  }

  filterByVeg(){
    this.isClikcedVeg = true;
    this.restaurantList = this.restaurantList.filter((r : IDaum) => r.info?.veg === true)
  }

  filterR(){
    console.log(this.filter)
    this.restaurantList = this.tempList.filter((r : IDaum) => r.info?.name.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase()))
  }
  
}
