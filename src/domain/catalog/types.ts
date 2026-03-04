export interface ProductShop {
  id: number
  category: number
  title: string
  price: number
  images: string[]
}

export interface Category {
  id: number
  title: string
}

export interface ProductSize {
  size: string
  available: boolean
}

export interface ProductDetails {
  id: number
  category: number
  title: string
  images: string[]
  sku?: string // sku это номер товара в магазине
  manufacturer?: string
  color?: string
  material?: string
  reason?: string
  season?: string
  heelSize?: string
  price: number
  oldPrice?: number
  sizes?: ProductSize[]
}
