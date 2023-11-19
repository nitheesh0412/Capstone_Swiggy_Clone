// import { MapsAPILoader } from '@agm/core';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  collapsed = true;
  name : string | null = window.localStorage.getItem("name");
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  userId : string | null = window.localStorage.getItem("id")
  constructor(private _userService: UserserviceService,
    private _restoservice : RestaurantService,
    private router : Router){
    
  }
  selected = "Delhi"
  len : number = 0;
  ngOnInit(){
    console.log(this._userService._phn)
    if (this._userService.isLoggedIn === 1) {
      this._userService.GetUserDetails().subscribe((data) => {
        console.log(data);
      });
    }
    console.log(this.name)
    this._restoservice.getCartItems(this.userId!).subscribe(data => {
      this.len = data.items.length
    })
  }
  handleLogo(){
    if(window.sessionStorage.getItem("token")){
      this.router.navigate(['/home'])
    }
    else{
      this.router.navigate([''])
    }
  }
  ngAfterViewInit(): void {
    
  }
}
