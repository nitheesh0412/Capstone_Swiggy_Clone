import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Map } from 'leaflet';
import * as L from 'leaflet';
import { IItem } from 'src/app/models/Items';
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  // private map!: L.Map;
  private centroid: L.LatLngExpression = [42.3601, -71.0589]; //

  latitude: number = 0
  longitude: number = 0
  c = 0
  orderItems: Array<IItem> = this._restoService.checkoutItems
  restoIdNames: Record<string,string | undefined> = this._restoService.restoNamesWithId
  totalPrice = this._restoService.checkoutPrice
  constructor(private _restoService: RestaurantService) {

  }
  tileLayer:any
  map :any
  marker:any|undefined=undefined
  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        this.map = L.map('map').setView([latitude, longitude], 18);

        this.tileLayer=L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        }).addTo(this.map);
        this.marker=L.marker([this.latitude,this.longitude]).addTo(this.map);
      
      });
    }
    this.watchPosition();
  }




  watchPosition() {
    navigator.geolocation.watchPosition(
      (position) => {
        this.c += 1
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
      },
      (err) => {
        alert('error')
        console.log(err)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  }
}
