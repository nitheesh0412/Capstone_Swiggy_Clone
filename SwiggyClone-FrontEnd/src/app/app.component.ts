import { OnInit, TemplateRef } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantService } from './services/restaurant.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userId : string = "654b67cf0166da2aa21d7782";
  constructor(private _restoservice : RestaurantService){

  }
  ngOnInit(){
    this._restoservice.getCartItems(this.userId).subscribe( data => {
      console.log(data);
      this._restoservice.cartLen = data.items.length
    } )
  }
}
