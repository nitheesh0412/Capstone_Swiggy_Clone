import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

declare const L:any;
@Component({
  selector: 'app-osm-map',
  templateUrl: './osm-map.component.html',
  styleUrls: ['./osm-map.component.css']
})
export class OsmMapComponent implements OnChanges{
  @Input()
  latitude:number=0
  
  @Input()
  longitude:number=0

  @Input()
  c:number=0

  map:any
  marker:any|undefined=undefined
  tileLayer:any
  ngOnChanges(changes: SimpleChanges): void {
    if(this.latitude!=0 && this.longitude!=0 && this.c<=1){
     
       this.map = L.map('map').setView([this.latitude, this.longitude], 18);
      this.tileLayer=L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png',{attribute:'OSM'}).addTo(this.map)
      this.marker=L.marker([this.latitude,this.longitude]).addTo(this.map)
      L.Routing.control({
        waypoints: [
          L.latLng(this.latitude, this.longitude),
          L.latLng(17.4481671, 78.3903332)
        ]
      }).addTo(this.map);
    }
  }
  
}
