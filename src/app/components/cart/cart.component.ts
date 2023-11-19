import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IItem } from 'src/app/models/Items';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems = this._restoservice.cartItems
  cart!: any

  restoIdNames : any = this._restoservice.restoNamesWithId
  constructor(private _restoservice: RestaurantService,
    private _userService: UserserviceService,
    public activatedRoute: ActivatedRoute,
    private router: Router) {


  }
  userId: string| null = window.localStorage.getItem("id")
  reducedArray!: any
  menuQuantityJson: any;
  totalPrice: Record<string,number> = {}
  ngOnInit() {
    this._restoservice.getCartItems(this.userId!).subscribe(data => {
      this.cartItems = data;
      this.reducedArray = this.cartItems.items.reduce(
        (acc: any, curr: any) => {
          if (!acc[curr.restaurantId]) {
            acc[curr.restaurantId] = []
          }
          acc[curr.restaurantId].push(curr);
          return acc;
        },
        {}
      );
      this.cart = Object.values(this.reducedArray)
      console.log(this.cart)

      this.cart?.forEach((element: any) => {
        element.forEach((item: any) => {
          const { restaurantId, price, quantity } = item;
          this.totalPrice[restaurantId] = (this.totalPrice[restaurantId] || 0) + price * quantity
        })


      });

      console.log(this.totalPrice)
    })
    this.fetchCartItems();


  }

  fetchTotalPrice(){
    this.cart?.forEach((element: any) => {
      element.forEach((item: any) => {
        // console.log(item)
        const { restaurantId, price, quantity } = item;
        // this.totalPrice[restaurantId] =0;
        // console.log(this.totalPrice[restaurantId])
        // console.log(restaurantId)
        
        this.totalPrice[restaurantId] = (this.totalPrice[restaurantId] || 0) + price * quantity
      })


    });
  }

  fetchCartItems() {
    this._restoservice.getCartItems(this.userId!).subscribe(data => {
      // console.log(data);
      this.cartItems = data;
      this.setQuantity();
    })
  }

  setQuantity() {
    console.log(this.cartItems)
    this.menuQuantityJson = this.cartItems?.items.reduce((acc: any, curr: any) => {
      acc[curr.id] = curr.quantity;
      // acc[curr.price] = curr.price;

      return acc;
    }, {});
    console.log(this.menuQuantityJson);


  }

  minusOne(menu: any) {
    console.log(menu)
    console.log("minus called", menu.restaurantId)
    let item: IItem = {
      id: menu.id,
      restaurantId: menu.restaurantId,
      name: menu.name,
      description: menu.description,
      price: menu.price,
      quantity: 1,
      category: menu.category,
      imageId: menu.imageId
    }
    this._restoservice.getCartItems(this.userId!).subscribe((data) => {
      this.cartItems = data;
      for (var val of data.items) {
        if (menu.id === val.id) {

          item.quantity = val.quantity - 1;
          if (item.quantity === 0) {

            console.log("itme", item.quantity)
            this._restoservice.deleteItem(item, this.userId!);
            this.fetchCartItems();
            this.fetchTotalPrice();
            window.location.reload();
          }
          else {
            // document.getElementById(menu.id)!.innerHTML = String(item.quantity);
            this._restoservice.updateQuantity(item, this.userId!);
            this.fetchCartItems();
            this.totalPrice[val.restaurantId] -= val.price;
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
      restaurantId: menu.restaurantId,
      name: menu.name,
      description: menu.description,
      price: menu.price,
      quantity: 1,
      category: menu.category,
      imageId: menu.imageId
    }
    this._restoservice.getCartItems(this.userId!).subscribe((data) => {
      for (var val of data.items) {
        if (menu.id === val.id) {
          console.log("quantity updated")
          item.quantity = val.quantity + 1;
          console.log(item.quantity)
          this._restoservice.updateQuantity(item, this.userId!);
          this.fetchCartItems();
          // this.fetchTotalPrice();
          this.totalPrice[val.restaurantId] += val.price;
          console.log(this.cartItems)

        }
      }
    });
    // this.fetchCartItems();

  }

  checkout(items : any, totalPrice : number){
    this._restoservice.checkoutItems = items;
  
    this._restoservice.checkoutPrice = totalPrice

  }
}
