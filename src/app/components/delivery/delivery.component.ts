import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder, Items } from 'src/app/models/Order';
import { RestaurantService } from 'src/app/services/restaurant.service';
declare let Razorpay: any
@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  cart!: any
  totalPrice!: any
  restoIdNames: any = this._restoservice.restoNamesWithId
  constructor(private _restoservice: RestaurantService,private router : Router) {
    
  }
  userId : any = window.localStorage.getItem("id");
  ngOnInit(): void {
    console.log(this._restoservice.checkoutItems)
    this.cart = this._restoservice.checkoutItems
    this.totalPrice = this._restoservice.checkoutPrice

    console.log(window.localStorage.getItem("success"))
  }
  handleOrder(){
    var itemss : Array<Items>  = []
    for(let item of this.cart ){
      var obj : Items = {
        name: item.name,
        price: String(item.price),
        quantity: item.quantity
      }
      itemss.push(obj);
    }
    var order : IOrder = {
      userId: this.userId,
      restoName: this.restoIdNames[this.cart[0].restaurantId],
      locality: 'hyderabad',
      areaName: 'hitech',
      restaurantId: this.cart[0].restaurantId,
      address: 'new raghavendara colony',
      items: itemss
    }
    console.log(order)
    this._restoservice.AddOrders(order)

    this._restoservice.DeleteCartItems(this.userId,this.cart[0].restaurantId)
  }
  payNow() {
    var RazorPayOptions = {
      description: 'food order',
      currency: 'INR',
      amount: (this.totalPrice + 50) * 100,
      name: 'SWIGGY CLONE',
      key: 'rzp_test_2qtVz49HMVd9oy',
      image: 'https://play-lh.googleusercontent.com/A8jF58KO1y2uHPBUaaHbs9zSvPHoS1FrMdrg8jooV9ftDidkOhnKNWacfPhjKae1IA=w240-h480-rw',
      handler: (response: { razorpay_payment_id: any }) => {
        // Navigate to the success page after successful payment
        this.router.navigate(['/home/trackorder']);
        
        // Store the payment ID in local storage
        window.localStorage.setItem("success", response.razorpay_payment_id);
        this.handleOrder();
      },
      prefill: {
        name: 'nitheesh',
        email: 'nitheesh@gmail.com',
        phone: '8008998839'
      },
      theme: {
        color: "#3399cc",
      }

    };
    var razorpay = new Razorpay(RazorPayOptions);
    

    razorpay.on('payment.failed', function (error: { description: string; }) {
      // Display failure alert message
      alert('Payment failed. Error: ' + error.description);
    });

    razorpay.on('payment.cancel', function (error: { description: string; }) {
      alert('Payment cancelled. Error: ' + error.description);
    });
    try {
      razorpay.open();
      
    } catch (err) {
      console.log(err);
    }


    
  }

}
