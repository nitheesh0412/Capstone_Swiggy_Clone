import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantmenuComponent } from './restaurantmenu.component';

describe('RestaurantmenuComponent', () => {
  let component: RestaurantmenuComponent;
  let fixture: ComponentFixture<RestaurantmenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantmenuComponent]
    });
    fixture = TestBed.createComponent(RestaurantmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
