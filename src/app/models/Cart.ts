import { IItem } from "./Items"

export interface ICart{
  
  userId : string,
  id : string,
  restaurantId : string,
  name : string,
  description : string,
  price : number,
  quantity : number,
  category : string,
  imageId : string
}


export interface IcartResponse{
  id : string,
  userId : string,
  items : Array<IItem>
}