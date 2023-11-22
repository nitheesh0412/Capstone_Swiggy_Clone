export type IFavItems = IFavItem[]

export interface IFavItem {
  _id: string
  userId: string
  restoId: string
  name: string
  imageId: string
  cuisines: string[]
  avgRating: string
  totalRatings: string
  discount: string
}
