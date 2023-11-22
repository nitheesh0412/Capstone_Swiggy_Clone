import { Component, OnInit } from '@angular/core';
import { IFavItem, IFavItems } from 'src/app/models/FavItemsResponse';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  userId = window.localStorage.getItem("id");
  FavItems : IFavItems = this._restoService.FavItems
  isLiked : Record<string,boolean> = this._restoService.isLiked
  constructor(private _restoService : RestaurantService){

  }
  ngOnInit(): void {
    this.getFavItems();

  }
  getFavItems(){
    this._restoService.getFavRestaurants(this.userId!).subscribe(data => {
      this.FavItems = data,
    
       console.log(this.FavItems)
       this.setQuantity();
    } );
  }

  setQuantity() {
    this.isLiked = this.FavItems?.reduce((acc: Record<string,boolean>, curr: IFavItem) => {
      acc[curr.restoId] = true;
      return acc;
    }, {});
    console.log(this.isLiked)
  }
  toggleLike(id : string){
    if(this.isLiked[id]){
      this.isLiked[id] = false;
      this._restoService.DeleteFromFav(id);
      
    }
  }
  
}
