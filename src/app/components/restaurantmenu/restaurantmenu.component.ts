import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { count } from 'rxjs';
import { ICart, IcartResponse } from 'src/app/models/Cart';
import { IItem } from 'src/app/models/Items';
import { IRestaurant } from 'src/app/models/Restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-restaurantmenu',
  templateUrl: './restaurantmenu.component.html',
  styleUrls: ['./restaurantmenu.component.css']
})
export class RestaurantmenuComponent implements OnInit {
  restoid!: string
  restoMenu: any
  tempList: any
  restoDetails: any
  restoOffers: any
  id : any = window.localStorage.getItem("id")
  addedToCart: boolean = false
  cartItems: any = this._restoservice.cartItems;
  menuQuantityJson: any
  filter!: string
  userId: string = this.id;
  FavItems : any = this._restoservice.FavItems
  isLiked : any = this._restoservice.isLiked
  toggleLike(resto: any) {
    console.log(this.isLiked)
    // this.isLiked[resto.id] = !this.isLiked;

    if (this.isLiked && this.isLiked[resto.id] === undefined) {
      this.isLiked[resto.id] = true
      const restaurant: IRestaurant = {
        userId : this.id,  
        restoId: resto.id,
        name: resto.name,
        imageId: resto.cloudinaryImageId,
        cuisines: resto.cuisines,
        avgRating: String(resto.avgRating),
        totalRatings: resto.totalRatingsString,
        discount : resto?.aggregatedDiscountInfo?.header
      }
      console.log(restaurant)
      this._restoservice.AddToFav(restaurant);
    }
    else {
      this.isLiked[resto.id] = false;
      this._restoservice.DeleteFromFav(resto.id);
    }
  }
  
  constructor(private _restoservice: RestaurantService,
    private _userService: UserserviceService,
    public activatedRoute: ActivatedRoute) {


  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params)
      this.restoid = params['id']
    })
    this._restoservice.getMenu(this.restoid).subscribe(data => {
      this.restoMenu = data.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards;
      this.tempList = this.restoMenu
      this.restoDetails = data.data.cards[0]?.card?.card
      this._restoservice.restoNamesWithId[this.restoDetails?.info?.id] = this.restoDetails?.info?.name
      this.restoOffers = data.data.cards[1]?.card?.card.gridElements.infoWithStyle.offers
      console.log(this.restoMenu)
    });

    this.fetchCartItems();
    this.getFavItems();

  }

  fetchCartItems() {

    this._restoservice.getCartItems(this.userId).subscribe(data => {
      
      this.cartItems = data;
      this.setQuantity();
    })
  }

  setQuantity() {
    console.log(this.cartItems)
    this.menuQuantityJson = this.cartItems?.items.reduce((acc: any, curr: any) => {
      acc[curr.id] = curr.quantity;
      return acc;
    }, {});
    console.log(this.menuQuantityJson);
  }


  getFavItems(){
    this._restoservice.getFavRestaurants(this.userId).subscribe(data => {
      this.FavItems = data,
    
       console.log(this.FavItems)
       this.setLiked();
    } );
  }

  setLiked() {
    this.isLiked = this.FavItems?.reduce((acc: any, curr: any) => {
      acc[curr.restoId] = true;
      return acc;
    }, {});
    console.log(this.isLiked)
  }


  share() {

    navigator.share({
      title: "art",
      text: "check out this art",
      url: String(window.location.href),


    })
  }

  addToCart(menu: any) {
    this._restoservice.getCartItems(this.userId).subscribe((data) => {
      if (data === null) {
        const item: ICart = {
          userId: this.userId,
          id: menu.id,
          restaurantId: this.restoid,
          name: menu.name,
          description: menu?.description,
          price: menu?.price / 100,
          quantity: 1,
          category: menu?.category,
          imageId: menu.imageId
        }
        const item1: IItem = {
          id: menu.id,
          restaurantId: this.restoid,
          name: menu.name,
          description: menu?.description,
          price: menu?.price / 100,
          quantity: 1,
          category: menu?.category,
          imageId: menu.imageId
        }
        console.log(item);
        this.cartItems!.userId = this.userId;
        this.cartItems!.items = [item1]
        console.log(this.cartItems);
        this._restoservice.AddToCart(item);
      }
      else {
        const item: IItem = {
          id: menu.id,
          restaurantId: this.restoid,
          name: menu.name,
          description: menu?.description,
          price: menu?.price / 100,
          quantity: 1,
          category: menu?.category,
          imageId: menu.imageId
        }
        this.cartItems.items.push(item);
        console.log(this.cartItems)
        // document.getElementById(menu.id)!.innerHTML = String(item.quantity);
        this.setQuantity();
        this._restoservice.AddItemToCart(item, this.userId);


      }
      // this.fetchCartItems();
    }

    )
  }
  minusOne(menu: any) {
    console.log("minus called")
    let item: IItem = {
      id: menu.id,
      restaurantId: this.restoid,
      name: menu.name,
      description: menu?.description,
      price: menu?.price / 100,
      quantity: 1,
      category: menu?.category,
      imageId: menu.imageId
    }
    this._restoservice.getCartItems(this.userId).subscribe((data) => {
      this.cartItems = data;
      for (var val of data.items) {
        if (menu.id === val.id) {

          item.quantity = val.quantity - 1;
          if (item.quantity === 0) {
            console.log("itme", item.quantity)
            this._restoservice.deleteItem(item, this.userId);
            this.fetchCartItems();
            document.getElementById(menu.price)!.innerHTML = "Add +";
          }
          else {
            // document.getElementById(menu.id)!.innerHTML = String(item.quantity);
            this._restoservice.updateQuantity(item, this.userId);
            this.fetchCartItems();
            // this.setQuantity();
          }

        }
      }
    });
    // this.fetchCartItems(); 

  }



  plusOne(menu: any) {
    console.log("plus called")
    let item: IItem = {
      id: menu.id,
      restaurantId: this.restoid,
      name: menu.name,
      description: menu?.description,
      price: menu?.price / 100,
      quantity: 1,
      category: menu?.category,
      imageId: menu.imageId
    }
    this._restoservice.getCartItems(this.userId).subscribe((data) => {
      for (var val of data.items) {
        if (menu.id === val.id) {
          console.log("quantity updated")
          item.quantity = val.quantity + 1;
          console.log(item.quantity)
          this._restoservice.updateQuantity(item, this.userId);
          this.fetchCartItems();
          console.log(this.cartItems)

        }
      }
    });
    // this.fetchCartItems();

  }

  filterR() {
    console.log(this.filter)
    console.log(this.restoMenu)
    this.restoMenu = this.tempList.filter((r: any) => {
      r?.card?.card?.itemCards?.card?.info?.name.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase()),
      console.log(r)
    })
  }
} 
