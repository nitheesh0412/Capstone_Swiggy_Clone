import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IDeliveryPartner } from '../models/DeliveryPartner';
import { Ilogin } from '../models/UserLogin';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DeliverypartnerService {

  isLoggedIndelivery : boolean = false
  constructor(private http: HttpClient,
    private router: Router,private toastr : ToastrService) { }

    RegisterUser(user: IDeliveryPartner) {

      console.log(user);
      this.http.post<IDeliveryPartner>("https://localhost:7105/api/Delivery/register", user).subscribe({
        next: (data => {
          this.toastr.success('Register Successful!','Please Login!');
        }),
        error: (err => {
          // alert("registeration failed");
          this.toastr.error('Register failed!','Please Try again!');
        })
      })
    }

    LoginUser(user : Ilogin){
      console.log(user);
      this.http.post<Ilogin>("https://localhost:7105/api/Delivery/login", user).subscribe({
        next: (data => {
          this.toastr.success('Earn money through delivery !','Login Successful!' );
          this.isLoggedIndelivery = true;
          window.sessionStorage.setItem("tokendelivery",String(this.isLoggedIndelivery));
          console.log(this.isLoggedIndelivery)
        }),
        error: (err => {
          this.toastr.error("Invalid phone/password")
        })
      })
    }

    haveaccess() : boolean{
      if(window.sessionStorage.getItem("tokendelivery")){
        return true;
      }
      return false;
    }
}
