import { Component, Input, OnInit } from '@angular/core';
import { OnSameUrlNavigation, Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant : any
  isLiked : boolean = false;
  constructor(private router : Router){

  }
  toggleLike(resto : any){
    this.isLiked = true;
    console.log(this.isLiked)
  }
  ngOnInit(){
    // console.log(this.restaurant.info.sla.slaString);

  }
  
  goToRestaurantDetails(){
this.router.navigate(['/restaurant', this.restaurant.info.id])
  }
  
}
