import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-restaurants-display',
  templateUrl: './restaurants-display.component.html',
  styleUrls: ['./restaurants-display.component.css']
})
export class RestaurantsDisplayComponent implements OnInit {
  restaurantList! : any
  tempList! : any
  restaurants! : any
  isLoading:boolean=true
  filter : string = ""
  constructor(private _userService: UserserviceService,
    private _restoservice : RestaurantService,
    public activatedRoute: ActivatedRoute,){
    
  }
  selected = "Banglore"
  ngOnInit(){
    console.log(this._userService._phn)
    if (this._userService.isLoggedIn === 1) {
      this._userService.GetUserDetails().subscribe((data) => {
        console.log(data);
      });
    }
    
    console.log(this.selected)

    this.activatedRoute.params.subscribe((params) => {
      console.log(params)
      this.selected = params['location']
      this.currLocation();
    })
    
  }
  currLocation(){
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

  filterByRating(e : any){
    console.log(e.target.value)
    this.restaurantList.sort((r1 : any,r2 : any) => (r2.info.avgRating) - r1.info.avgRating);
    console.log(this.restaurantList)
  }
  filterByDeliveryTime(e:any){
    this.restaurantList.sort((r1 : any,r2 : any) => (r1.info.sla.deliveryTime) - r2.info.sla.deliveryTime);
  }

  filterByPopulariy(e:any){
    this.restaurantList = this.restaurantList.filter((r : any) => r.info?.veg === true)
  }

  filterR(){
    console.log(this.filter)
    this.restaurantList = this.tempList.filter((r : any) => r.info?.name.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase()))
  }
  
}
