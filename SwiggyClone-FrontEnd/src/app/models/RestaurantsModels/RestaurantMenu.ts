export interface IRootMenu {
  statusCode: number
  data: IData
  tid: string
  sid: string
  deviceId: string
  csrfToken: any
}

export interface IData {
  statusMessage: string
  cards: ICard[]
  firstOffsetRequest: boolean
  isQCLink: boolean
}

export interface ICard {
  card?: ICard2
  groupedCard?: IGroupedCard
}

export interface ICard2 {
  card: ICard3
  relevance?: IRelevance
}

export interface ICard3 {
  "@type": string
  info?: IInfoMenu
  analytics?: IAnalytics
  layout?: ILayout
  id?: string
  gridElements?: IGridElements
}

export interface IInfoMenu {
  id: string
  name: string
  city: string
  slugs: ISlugs
  uniqueId: string
  cloudinaryImageId: string
  locality: string
  areaName: string
  costForTwo: string
  costForTwoMessage: string
  cuisines: string[]
  avgRating: number
  feeDetails: IFeeDetails
  parentId: string
  avgRatingString: string
  totalRatingsString: string
  sla: ISla
  availability: IAvailability
  aggregatedDiscountInfo: IAggregatedDiscountInfo
  badges: IBadges
  slugString: string
  isOpen: boolean
  labels: ILabel[]
  totalRatings: number
  aggregatedDiscountInfoV2: IAggregatedDiscountInfoV2
  type: string
  headerBanner: IHeaderBanner
  generalPurposeInfoListV2: IGeneralPurposeInfoListV2[]
  ratingSlab: string
  availabilityServiceabilityMessage: string
  orderabilityCommunication: IOrderabilityCommunication
  hasBestsellerItems: boolean
  cartOrderabilityNudgeBanner: ICartOrderabilityNudgeBanner
  latLong: string
}

export interface ISlugs {
  restaurant: string
  city: string
}

export interface IFeeDetails {
  restaurantId: string
  fees: IFee[]
  totalFee: number
  icon: string
  message: string
}

export interface IFee {
  name: string
  fee?: number
}

export interface ISla {
  restaurantId: string
  lastMileTravel: number
  serviceability: string
  rainMode: string
  longDistance: string
  lastMileTravelString: string
  iconType: string
}

export interface IAvailability {
  nextCloseTime: string
  visibility: boolean
  opened: boolean
  restaurantClosedMeta: IRestaurantClosedMeta
}

export interface IRestaurantClosedMeta {}

export interface IAggregatedDiscountInfo {
  header: string
  shortDescriptionList: IShortDescriptionList[]
  descriptionList: IDescriptionList[]
  visible: boolean
}

export interface IShortDescriptionList {
  meta?: string
  discountType: string
  operationType: string
}

export interface IDescriptionList {
  meta: string
  discountType: string
  operationType: string
}

export interface IBadges {}

export interface ILabel {
  title: string
  message: string
}

export interface IAggregatedDiscountInfoV2 {
  header: string
  shortDescriptionList: IShortDescriptionList2[]
  descriptionList: IDescriptionList2[]
  couponDetailsCta: string
}

export interface IShortDescriptionList2 {
  meta?: string
  discountType: string
  operationType: string
}

export interface IDescriptionList2 {
  meta: string
  discountType: string
  operationType: string
}

export interface IHeaderBanner {
  url: string
}

export interface IGeneralPurposeInfoListV2 {
  cta: ICta
}

export interface ICta {
  info: IInfoMenu2
  linkCta: ILinkCta
}

export interface IInfoMenu2 {
  recordings: IRecordings
}

export interface IRecordings {}

export interface ILinkCta {}

export interface IOrderabilityCommunication {
  title: ITitle
  subTitle: ISubTitle
  message: IMessage
  customIcon: ICustomIcon
}

export interface ITitle {
  text: string
}

export interface ISubTitle {
  text: string
}

export interface IMessage {
  text: string
  textColour: string
}

export interface ICustomIcon {
  bgGradientColorStart: string
  bgGradientColorEnd: string
}

export interface ICartOrderabilityNudgeBanner {
  parameters: IParameters
  presentation: IPresentation
}

export interface IParameters {}

export interface IPresentation {}

export interface IAnalytics {}

export interface ILayout {
  rows: number
  columns: number
  horizontalScrollEnabled: boolean
  itemSpacing: number
  lineSpacing: number
  widgetPadding: IWidgetPadding
  containerStyle: IContainerStyle
  scrollBar: IScrollBar
}

export interface IWidgetPadding {}

export interface IContainerStyle {
  containerPadding: IContainerPadding
}

export interface IContainerPadding {
  left: number
  right: number
  bottom: number
}

export interface IScrollBar {}

export interface IGridElements {
  infoWithStyle: IInfoMenuWithStyle
}

export interface IInfoMenuWithStyle {
  "@type": string
  offers: IOffer[]
  habitMilestoneInfo: IHabitMilestoneInfo
}

export interface IOffer {
  info: IInfoMenu3
  cta: ICta2
}

export interface IInfoMenu3 {
  header: string
  offerTagColor: string
  offerIds: string[]
  expiryTime: string
  couponCode: string
  description: string
  offerType: string
  restId: string
  offerLogo: string
  descriptionTextColor: string
  logoBottom?: string
}

export interface ICta2 {
  type: string
}

export interface IHabitMilestoneInfo {
  callout: ICallout
}

export interface ICallout {}

export interface IRelevance {
  type: string
  sectionId: string
}

export interface IGroupedCard {
  cardGroupMap: ICardGroupMap
}

export interface ICardGroupMap {
  REGULAR: IRegular
}

export interface IRegular {
  cards: ICard4[]
}

export interface ICard4 {
  card: ICard5
}

export interface ICard5 {
  card: ICard6
}

export interface ICard6 {
  "@type": string
  badges?: IBadges2
  vegOnlyDetails?: IVegOnlyDetails
  offersFilter?: IOffersFilter
  topRatedFilter?: ITopRatedFilter
  kidsCategoryFilter?: IKidsCategoryFilter
  vegFilter?: IVegFilter
  nonvegFilter?: INonvegFilter
  title?: string
  itemCards?: IItemCard[]
  type?: string
  imageId?: string
  text?: string[]
  name?: string
  area?: string
  completeAddress?: string
}

export interface IBadges2 {}

export interface IVegOnlyDetails {
  imageId: string
  title: string
  description: string
}

export interface IOffersFilter {
  attributes:IAttributes
}

export interface IAttributes {
  displayText: string
}

export interface ITopRatedFilter {}

export interface IKidsCategoryFilter {
  attributes: IAttributes2
}

export interface IAttributes2 {
  displayText: string
  tooltip: ITooltip
}

export interface ITooltip {
  enabled: boolean
  displayText: string
}

export interface IVegFilter {
  attributes: IAttributes3
}

export interface IAttributes3 {
  displayText: string
}

export interface INonvegFilter {
  attributes: IAttributes4
}

export interface IAttributes4 {
  displayText: string
}

export interface IItemCard {
  card: ICard7
}

export interface ICard7 {
  "@type": string
  info: IInfoMenu4
  analytics: IAnalytics2
  hideRestaurantDetails: boolean
}

export interface IInfoMenu4 {
  id: string
  name: string
  category: string
  description?: string
  imageId: string
  inStock: number
  isVeg?: number
  price: number
  variants: IVariants
  variantsV2: IVariantsV2
  itemAttribute: IItemAttribute
  ribbon: IRibbon
  type?: string
  itemBadge: IItemBadge
  badgesV2: IBadgesV2
  ratings: IRatings
  defaultPrice?: number
  addons?: IAddon[]
  offerTags?: IOfferTag[]
  isBestseller?: boolean
  showImage?: boolean
}

export interface IVariants {}

export interface IVariantsV2 {
  variantGroups?: IVariantGroup[]
  pricingModels?: IPricingModel[]
}

export interface IVariantGroup {
  groupId: string
  name: string
  variations: IVariation[]
}

export interface IVariation {
  name: string
  price?: number
  id: string
  inStock?: number
  isVeg?: number
  isEnabled: number
  default?: number
}

export interface IPricingModel {
  variations: IVariation2[]
  price: number
  addonCombinations?: IAddonCombination[]
}

export interface IVariation2 {
  groupId: string
  variationId: string
}

export interface IAddonCombination {
  groupId: string
  addonId: string
}

export interface IItemAttribute {
  vegClassifier: string
}

export interface IRibbon {
  text?: string
  textColor?: string
  topBackgroundColor?: string
  bottomBackgroundColor?: string
}

export interface IItemBadge {}

export interface IBadgesV2 {}

export interface IRatings {
  aggregatedRating: IAggregatedRating
}

export interface IAggregatedRating {
  rating?: string
  ratingCount?: string
  ratingCountV2?: string
}

export interface IAddon {
  groupId: string
  groupName: string
  choices: IChoice[]
  maxAddons: number
  maxFreeAddons: number
  minAddons?: number
}

export interface IChoice {
  id: string
  name: string
  price?: number
  inStock?: number
  isVeg?: number
  isEnabled: number
}

export interface IOfferTag {
  title: string
  subTitle: string
  textColor: string
  backgroundColor: string
}

export interface IAnalytics2 {}
