export interface ICartList {
  _id: string
  userId: string
  items: IMenuItem[]
}

export interface IMenuItem {
  id: string
  restaurantId: string
  name: string
  description: string
  price: number
  quantity: number
  category: string
  imageId: string
}
