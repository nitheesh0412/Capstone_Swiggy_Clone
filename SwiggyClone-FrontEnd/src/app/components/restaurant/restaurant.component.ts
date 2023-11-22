import { Component, Input, OnInit } from '@angular/core';
import { OnSameUrlNavigation, Route, Router, RouterLink } from '@angular/router';
import { IDaum } from 'src/app/models/RestaurantsModels/RestaurantList';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant! : IDaum
  isLiked : boolean = false;
  constructor(private router : Router){

  }
  ngOnInit(){
  }
  
  goToRestaurantDetails(){
this.router.navigate(['/restaurant', this.restaurant.info.id])
  }
  
}
