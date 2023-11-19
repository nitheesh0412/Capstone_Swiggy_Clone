export interface IOrder{
  userId : string,
  restoName : string,
  locality : string,
  areaName : string,
  restaurantId : string,
  address : string,
  items : Array<Items>
}

export interface Items{
  name : string,
  price : string,
  quantity : number,
}