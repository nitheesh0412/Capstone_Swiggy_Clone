import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { count } from 'rxjs';
import { ICart, IcartResponse } from 'src/app/models/Cart';
import { ICartList, IMenuItem } from 'src/app/models/CartItemsResponse';
import { IFavItem, IFavItems } from 'src/app/models/FavItemsResponse';
import { IItem } from 'src/app/models/Items';
import { IRestaurant } from 'src/app/models/Restaurant';
import { ICard3, ICard4, IInfoMenu, IInfoMenu4, IItemCard, IOffer } from 'src/app/models/RestaurantsModels/RestaurantMenu';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-restaurantmenu',
  templateUrl: './restaurantmenu.component.html',
  styleUrls: ['./restaurantmenu.component.css']
})
export class RestaurantmenuComponent implements OnInit {
  restoid!: string
  restoMenu!: ICard4[] | undefined
  tempList!: ICard4[] | undefined
  restoDetails!: ICard3
  restoOffers!: IOffer[] | undefined
  id: string | null = window.localStorage.getItem("id")
  addedToCart: boolean = false
  cartItems: ICartList = this._restoservice.cartItems;
  menuQuantityJson!: Record<string, number>
  filter!: string
  userId: string = this.id!
  FavItems: IFavItems = this._restoservice.FavItems
  isLiked: Record<string, boolean> = this._restoservice.isLiked
  toggleLike(resto: IInfoMenu) {
    console.log(this.isLiked)

    if (this.isLiked && this.isLiked[resto.id] === undefined) {
      this.isLiked[resto.id] = true
      const restaurant: IRestaurant = {
        userId: this.id!,
        restoId: resto.id,
        name: resto.name,
        imageId: resto.cloudinaryImageId,
        cuisines: resto.cuisines,
        avgRating: String(resto.avgRating),
        totalRatings: resto.totalRatingsString,
        discount: resto?.aggregatedDiscountInfo?.header
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
      this.restoMenu = data?.data?.cards[2]?.groupedCard?.cardGroupMap.REGULAR.cards;
      this.tempList = this.restoMenu
      if (data.data.cards[0]?.card?.card) {
        this.restoDetails = data.data.cards[0]?.card?.card
      }

      this._restoservice.restoNamesWithId[this.restoDetails?.info?.id!] = this.restoDetails?.info?.name

      this.restoOffers = data.data.cards[1]?.card?.card?.gridElements?.infoWithStyle.offers
      console.log(this.restoMenu)
    });

    this.fetchCartItems();
    this.getFavItems();

  }

  fetchCartItems() {

    this._restoservice.getCartItems(this.userId!).subscribe(data => {

      this.cartItems = data;
      this.setQuantity();
    })
  }

  setQuantity() {
    console.log(this.cartItems)
    this.menuQuantityJson = this.cartItems?.items.reduce((acc: Record<string, number>, curr: IMenuItem) => {
      acc[curr.id] = curr.quantity;
      return acc;
    }, {});
    console.log(this.menuQuantityJson);
  }


  getFavItems() {
    this._restoservice.getFavRestaurants(this.userId).subscribe(data => {
      this.FavItems = data,

        console.log(this.FavItems)
      this.setLiked();
    });
  }

  setLiked() {
    this.isLiked = this.FavItems?.reduce((acc: Record<string, boolean>, curr: IFavItem) => {
      acc[curr.restoId] = true;
      return acc;
    }, {});
    console.log(this.isLiked)
  }


  share() {

    navigator.share({
      title: "Item",
      text: "check out this Restaurant",
      url: String(window.location.href),


    })
  }

  addToCart(menu: IInfoMenu4) {
    this._restoservice.getCartItems(this.userId).subscribe((data) => {
      if (data === null) {
        const item: ICart = {
          userId: this.userId,
          id: menu.id,
          restaurantId: this.restoid,
          name: menu.name,
          description: menu.description!,
          price: menu?.price / 100,
          quantity: 1,
          category: menu?.category,
          imageId: menu.imageId
        }
        const item1: IItem = {
          id: menu.id,
          restaurantId: this.restoid,
          name: menu.name,
          description: menu.description!,
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
          description: menu.description!,
          price: menu?.price / 100,
          quantity: 1,
          category: menu?.category,
          imageId: menu.imageId
        }
        this.cartItems.items.push(item);
        console.log(this.cartItems)
        this.setQuantity();
        this._restoservice.AddItemToCart(item, this.userId);


      }
      // this.fetchCartItems();
    }

    )
  }
  minusOne(menu: IInfoMenu4) {
    console.log("minus called")
    let item: IItem = {
      id: menu.id,
      restaurantId: this.restoid,
      name: menu.name,
      description: menu.description!,
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
            document.getElementById(String(menu.price))!.innerHTML = "Add +";
          }
          else {
            this._restoservice.updateQuantity(item, this.userId);
            this.fetchCartItems();
          }

        }
      }
    });

  }



  plusOne(menu: IInfoMenu4) {
    console.log("plus called")
    let item: IItem = {
      id: menu.id,
      restaurantId: this.restoid,
      name: menu.name,
      description: menu.description!,
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
  }

  filterR() {
    console.log(this.filter)
    console.log(this.restoMenu)
    this.restoMenu = this.tempList?.filter((r: ICard4) =>
      {
        console.log(r?.card?.card?.itemCards?.filter((s: IItemCard) => s.card.info.name.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())))
      }
    )
    // console.log(r))
    console.log(this.restoMenu)
  }
} 
