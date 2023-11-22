import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserserviceService } from './userservice.service';
import { ICart } from '../models/Cart';
import { IItem } from '../models/Items';
import { IOrder } from '../models/Order';
import { IDaum, IRoot } from '../models/RestaurantsModels/RestaurantList';
import { ICard4, IRootMenu } from '../models/RestaurantsModels/RestaurantMenu';
import { IFavItems } from '../models/FavItemsResponse';
import { ICartList, IMenuItem } from '../models/CartItemsResponse';
import { IRestaurant } from '../models/Restaurant';
import { IOrderList } from '../models/OrdersResponse';

@Injectable({
  providedIn: 'root'
})

export class RestaurantService {

  restaurantId!: number
  location!: string
  cloudinaryImageId!: string
  MenuImageId!: string
  restaurantsList!: IRoot
  restaurantMenu!: ICard4[] | undefined
  userId: string | null = window.localStorage.getItem("id");
  public cartItems! : ICartList
  public restoNamesWithId : Record<string,string | undefined> = {}
  public checkoutItems! : Array<IItem>
  public checkoutPrice! : number
  public FavItems! : IFavItems
  public isLiked! : Record<string,boolean>
  public cartLen : number = 0
  // you can see details of restaurant
  // in restaurantList collection see data.id
  url: string = "https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=25.5940947&lng=85.1375645&restaurantId="

  // location wise resturants
  //
  urlLocaion: string = `https://swiggy-clone-wjqx.onrender.com/api/v1/restaurant?location=`

  
  // in restaurantList collection see data.cloudinaryImageId
  urlRestaurantImage: string = `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/${this.cloudinaryImageId}`


  urlMenuImage: string = `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/${this.MenuImageId}`




  constructor(private http: HttpClient,
    private _userService : UserserviceService) { }


  getRestaurantsByLocation(location: string, pageNo: number):
    Observable<IRoot> {

    location = location.toLocaleLowerCase();
    console.log(location)
    return this.http.get<IRoot>(`https://swiggy-clone-wjqx.onrender.com/api/v1/restaurant?location=${location}&page=${pageNo}`).pipe(
      tap(restaurants => this.restaurantsList = restaurants)
    )
  }

  getMenu(id: string): Observable<IRootMenu> {
    return this.http.get<IRootMenu>(this.url + id).pipe(
      tap(resto => {
        console.log(resto)
        this.restaurantMenu = resto?.data?.cards[2]?.groupedCard?.cardGroupMap.REGULAR.cards;
        console.log(this.restaurantMenu);
      })
    )
  }

  
  AddToCart(cart : ICart){  
    this.http.post<ICart>(`https://localhost:7105/api/Cart/${cart.userId}`,cart);
  }


  getCartItems(id: string) : Observable<ICartList>{
    return this.http.get<ICartList>(`https://localhost:7105/api/Cart/${id}`).pipe(
      tap( menu => {
        this.cartItems = menu;
      })
    )
  }

  DeleteCartItems(id : string, restoID : string) : void{
    this.http.delete<ICartList>(`https://localhost:7105/api/Cart/deleterestoitems/${id}?restoID=${restoID}`).subscribe((data) => this.cartItems = data)
  }

  AddItemToCart(item : IItem , id : string) : void{
    this.http.put<ICartList>(`https://localhost:7105/api/Cart/add/${id}`,item).subscribe(data => this.cartItems = data);
  }

  updateQuantity(item : IItem, id : string) : void{
    this.http.put<IItem>(`https://localhost:7105/api/Cart/${id}`,item).subscribe(data => console.log(data ));
  }

  deleteItem(item : IMenuItem,id : string) : void{
    this.http.delete<ICartList>(`https://localhost:7105/api/Cart/${id}`,{
      body: item
   }).subscribe(data => this.cartItems = data);
  }


  AddToFav(resto : IRestaurant) : void{
    console.log(resto)
    resto.userId = this.userId!;
    this.http.post<IRestaurant>('https://localhost:7105/api/Fav',resto).subscribe(data => console.log(data));
  }
  DeleteFromFav(id : string) : void{
    console.log(id)
    this.http.delete(`https://localhost:7105/api/Fav/${id}`).subscribe(data => console.log(data));
  }
  getFavRestaurants(id : string) : Observable<IFavItems>{
    return this.http.get<IFavItems>(`https://localhost:7105/api/Fav/${id}`).pipe(
      tap(data =>
        this.FavItems = data
        )
    )
  }

  AddOrders(order : IOrder) : void{
    order.userId = this.userId!;
    this.http.post('https://localhost:7105/api/Order',order).subscribe(data => console.log(data));
  }
  GetOrders(id : string) : Observable<IOrderList>{
    return this.http.get<IOrderList>(`https://localhost:7105/api/Order/${id}`).pipe(
      tap(data =>
        // this.FavItems = data
        console.log(data)
        )
    )
  }

  haveaccess() : boolean{
    if(window.sessionStorage.getItem("token")){
      return true;
    }
    return false;
  }
}
