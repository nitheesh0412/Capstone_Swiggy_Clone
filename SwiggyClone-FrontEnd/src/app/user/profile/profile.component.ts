import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IDeliveryPartner } from 'src/app/models/DeliveryPartner';
import { IOrder } from 'src/app/models/Order';
import {  IOrderList } from 'src/app/models/OrdersResponse';
import { Ilogin } from 'src/app/models/UserLogin';
import { DeliverypartnerService } from 'src/app/services/deliverypartner.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name! : string
  email! : string
  phone! : string
  userRegister! : FormGroup
  userLogin! : FormGroup;
  hide: boolean = true
  orders! : IOrderList
  stars : Array<number> = [1,2,3,4,5]
  rating : number = 0;
  totalPrice : Record<string,number> = {}
  // randomly assigning some user order to delivery partner as said in problem statement
  userId : string ="654b67cf0166da2aa21d7782";
  
  user_register: IDeliveryPartner = {
    Name: "",
    Email: "",
    Phone: 0,
    typeOfVehicle : "",
    VehicleNo : "",
    LicenseNo : "",
    RCNo : "",
    Password: ""
  }
  userlogin: Ilogin = {
    Phone: 0,
    Password: ""
  }
  isLoggedInDelivery: string|null = window.sessionStorage.getItem("tokendelivery");
  constructor(private router : Router, private _userservice : UserserviceService,private fb: FormBuilder,private _delivery : DeliverypartnerService,
    private _restoService : RestaurantService,
    private toastr : ToastrService,
    ){


  }
  partner : boolean = false
  ngOnInit(): void {
    this.isLoggedInDelivery = window.sessionStorage.getItem("tokendelivery");
    this.subscribeUserDetails();

    this.userRegister = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(10), Validators.minLength(10)]],
      typeOfVehicle : ['',Validators.required],
      VehicleNo : ['',Validators.required],
      LicenseNo : ['',Validators.required],
      RCNo : ['',Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
    this.userLogin = this.fb.group({
      phonelogin: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(10), Validators.minLength(10)]],
      passwordlogin: ['', [Validators.required, Validators.minLength(8)]]
    })
    this._restoService.GetOrders(this.userId).subscribe((data) => {
      this.orders = data;
      this.orders.forEach((order : IOrder) => {
        for(let idx of order.items){
          this.totalPrice[order.restaurantId] = (this.totalPrice[order.restaurantId] || 0) + Number(idx.price)*idx.quantity;
        }
      })
    })

  }
  subscribeUserDetails(){

    this._userservice.GetUserDetails().subscribe((data) => {
      
      this.name = data.name
      this.email = data.email
      this.phone = String(data.phone)
    })
  }
  logout(){
    this._userservice.isLoggedIn = 0;
    window.localStorage.removeItem("name");
    window.localStorage.removeItem("id");
    window.sessionStorage.removeItem("token")
    window.sessionStorage.removeItem("tokendelivery")
    this.router.navigate(['/'])
    this.toastr.success('Logged Out');
  }

  RegisterAction(){
    this.user_register.Name = this.userRegister.value.name;

    this.user_register.Email = this.userRegister.value.email;
    this.user_register.Phone = this.userRegister.value.phone;
    this.user_register.typeOfVehicle = this.userRegister.value.typeOfVehicle;
    this.user_register.VehicleNo = this.userRegister.value.VehicleNo;
    this.user_register.LicenseNo = this.userRegister.value.LicenseNo;
    this.user_register.RCNo = this.userRegister.value.RCNo;
    this.user_register.Password = this.userRegister.value.password;

    console.log(this.user_register)
    this._delivery.RegisterUser(this.user_register);
  }
  login(){
    this.partner = true;
  }
  register(){
    this.partner = false;
  }
  loginAction() {
    console.log(this.userLogin.value)

    this.userlogin.Phone = this.userLogin.value.phonelogin;
    this.userlogin.Password = this.userLogin.value.passwordlogin;

    this._delivery.LoginUser(this.userlogin);
    
    this._restoService.GetOrders(this.userId).subscribe((data) => this.orders = data)
    console.log(this.partner, this.isLoggedInDelivery)
    window.location.reload()
    
  }

  updateRating(i : number) : void{
    this.rating = i;
  }
}
