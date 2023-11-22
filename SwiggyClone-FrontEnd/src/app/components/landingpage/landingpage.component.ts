import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Ilogin } from 'src/app/models/UserLogin';
import { IRegister } from 'src/app/models/UserRegister';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
  title = 'swiggyClone';

  userLogin: FormGroup;
  userRegister: FormGroup;
  hide: boolean = true

  user_register: IRegister = {
    Name: "",
    Email: "",
    Phone: 0,
    Password: ""
  }
  userlogin: Ilogin = {
    Phone: 0,
    Password: ""
  }
  constructor(private offcanvasService: NgbOffcanvas,
    private fb: FormBuilder,
    private _restaurantService: RestaurantService,
    private _userService: UserserviceService,
    private toastr: ToastrService) {

    this.userLogin = this.fb.group({

    })

    this.userRegister = this.fb.group({

    })
  }


  ngOnInit(): void {
    this.userRegister = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(10), Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })

    this.userLogin = this.fb.group({
      phonelogin: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(10), Validators.minLength(10)]],
      passwordlogin: ['', [Validators.required, Validators.minLength(8)]]
    })

    // this._restaurantService.getUsers().subscribe((data) => console.log(data.data.cards[3].groupedCard.cardGroupMap.REGULAR.cards));

  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }



  RegisterAction() {
    console.log(this.userRegister.value)

    this.user_register.Name = this.userRegister.value.name;

    this.user_register.Email = this.userRegister.value.email;
    this.user_register.Phone = this.userRegister.value.phone;
    this.user_register.Password = this.userRegister.value.password;

    console.log(this.user_register)
    this._userService.RegisterUser(this.user_register);


  }

  loginAction() {
    console.log(this.userLogin.value)

    this.userlogin.Phone = this.userLogin.value.phonelogin;
    this.userlogin.Password = this.userLogin.value.passwordlogin;

    this._userService.LoginUser(this.userlogin);

    
  }

  

}
