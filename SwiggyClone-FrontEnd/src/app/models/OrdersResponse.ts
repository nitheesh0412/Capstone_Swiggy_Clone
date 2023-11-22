export type IOrderList = IOrders[]

export interface IOrders {
  _id: string
  userId: string
  restoName: string
  locality: string
  areaName: string
  restaurantId: string
  address: string
  items: IDetails[]
}

export interface IDetails {
  name: string
  price: string
  quantity: number
}