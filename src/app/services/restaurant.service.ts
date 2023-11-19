import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserserviceService } from './userservice.service';
import { ICart } from '../models/Cart';
import { IItem } from '../models/Items';
import { IOrder } from '../models/Order';

@Injectable({
  providedIn: 'root'
})

export class RestaurantService {

  restaurantId!: number
  location!: string
  cloudinaryImageId!: string
  MenuImageId!: string
  restaurantsList!: any
  restaurantMenu!: any
  userId: any = window.localStorage.getItem("id");
  public cartItems : any
  public restoNamesWithId : Record<string,string> = {}
  public checkoutItems : any
  public checkoutPrice : any
  public FavItems : any
  public isLiked : any
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
    Observable<any> {

    location = location.toLocaleLowerCase();
    console.log(location)
    return this.http.get<any>(`https://swiggy-clone-wjqx.onrender.com/api/v1/restaurant?location=${location}&page=${pageNo}`).pipe(
      tap(restaurants => this.restaurantsList = restaurants)
    )
  }

  getMenu(id: string): Observable<any> {
    return this.http.get<any>(this.url + id).pipe(
      tap(resto => {
        console.log(resto)
        this.restaurantMenu = resto.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards;
        console.log(this.restaurantMenu);
      })
    )
  }

  
  AddToCart(cart : ICart){  
    this.http.post<any>(`https://localhost:7105/api/Cart/${cart.userId}`,cart).subscribe(data => this.cartItems = data);
  }


  getCartItems(id: string) : Observable<any>{
    return this.http.get<any>(`https://localhost:7105/api/Cart/${id}`).pipe(
      tap( menu => {
        console.log(menu)
        this.cartItems = menu;
      })
    )
  }

  DeleteCartItems(id : string, restoID : string){
    this.http.delete(`https://localhost:7105/api/Cart/deleterestoitems/${id}?restoID=${restoID}`).subscribe((data) => this.cartItems = data)
  }

  AddItemToCart(item : IItem , id : string){
    this.http.put<any>(`https://localhost:7105/api/Cart/add/${id}`,item).subscribe(data => this.cartItems = data);
  }

  updateQuantity(item : IItem, id : string){
    this.http.put<any>(`https://localhost:7105/api/Cart/${id}`,item).subscribe(data => console.log(data ));
  }

  deleteItem(item : any,id : string){
    this.http.delete<any>(`https://localhost:7105/api/Cart/${id}`,{
      body: item
   }).subscribe(data => this.cartItems = data);
  }


  AddToFav(resto : any){
    console.log(resto)
    resto.userId = this.userId;
    this.http.post('https://localhost:7105/api/Fav',resto).subscribe(data => console.log(data));
  }
  DeleteFromFav(id : any){
    console.log(id)
    this.http.delete(`https://localhost:7105/api/Fav/${id}`).subscribe(data => console.log(data));
  }
  getFavRestaurants(id : any) : Observable<any>{
    return this.http.get(`https://localhost:7105/api/Fav/${id}`).pipe(
      tap(data =>
        this.FavItems = data
        )
    )
  }

  AddOrders(order : IOrder){
    order.userId = this.userId;
    this.http.post('https://localhost:7105/api/Order',order).subscribe(data => console.log(data));
  }
  GetOrders(id : string) : Observable<any>{
    return this.http.get(`https://localhost:7105/api/Order/${id}`).pipe(
      tap(data =>
        this.FavItems = data
        )
    )
  }
}
