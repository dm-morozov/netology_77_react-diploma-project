export interface OrderOwner {
  phone: string
  address: string
}

export interface OrderItem {
  id: number
  price: number
  count: number
}

export interface OrderPayload {
  owner: OrderOwner
  items: OrderItem[]
}
