export interface IUserDetails {
  _id: string
  name: string
  email: string
  phone: number
  hashedPassword: string
  saltPassword: string
}
