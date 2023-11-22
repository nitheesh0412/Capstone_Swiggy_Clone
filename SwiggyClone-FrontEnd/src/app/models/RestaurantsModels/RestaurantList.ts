export interface IRoot {
  status: string
  total: number
  data: IDaum[]
}

export interface IDaum {
  _id: string
  location: string
  info: IInfo
  analytics: IAnalytics
  cta: ICta
  widgetId: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IInfo {
  id: string
  name: string
  cloudinaryImageId: string
  locality: string
  areaName: string
  costForTwo: string
  cuisines: string[]
  avgRating?: number
  feeDetails: IFeeDetails
  parentId: string
  avgRatingString: string
  totalRatingsString?: string
  sla: ISla
  availability: IAvailability
  isOpen: boolean
  type: string
  aggregatedDiscountInfoV3?: IAggregatedDiscountInfoV3
  loyaltyDiscoverPresentationInfo: ILoyaltyDiscoverPresentationInfo
  differentiatedUi: IDifferentiatedUi
  displayType: string
  veg?: boolean
  isNewlyOnboarded?: boolean
  badges?: IBadges
  badgesV2?: IBadgesV2
}

export interface IFeeDetails {
  restaurantId: string
  fees: IFee[]
  totalFee: number
}

export interface IFee {
  name: string
  fee?: number
}

export interface ISla {
  deliveryTime: number
  lastMileTravel: number
  serviceability: string
  slaString: string
  lastMileTravelString: string
  iconType: string
}

export interface IAvailability {
  nextCloseTime: string
  opened: boolean
}

export interface IAggregatedDiscountInfoV3 {
  header: string
  subHeader: string
  discountTag?: string
}

export interface ILoyaltyDiscoverPresentationInfo {
  logoCtx: ILogoCtx
  freedelMessage: string
}

export interface ILogoCtx {
  text: string
  logo: string
}

export interface IDifferentiatedUi {
  displayType: string
  differentiatedUiMediaDetails: IDifferentiatedUiMediaDetails
}

export interface IDifferentiatedUiMediaDetails {
  mediaType: string
}

export interface IBadges {
  textExtendedBadges: ITextExtendedBadge[]
}

export interface ITextExtendedBadge {
  iconId: string
  shortDescription: string
  fontColor: string
}

export interface IBadgesV2 {
  entityBadges: IEntityBadges
}

export interface IEntityBadges {
  textExtendedBadges: ITextExtendedBadges
}

export interface ITextExtendedBadges {
  badgeObject: IBadgeObject[]
}

export interface IBadgeObject {
  attributes: IAttributes
}

export interface IAttributes {
  description: string
  fontColor: string
  iconId: string
  shortDescription: string
}

export interface IAnalytics {
  context: string
}

export interface ICta {
  link: string
  text: string
  type: string
}
