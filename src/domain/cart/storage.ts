import type { CartItem } from './types'

const CART_STORAGE_KEY = 'cart_items'

export const loadCartFromStorage = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed: CartItem[] = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const saveCartToStorage = (item: CartItem[]) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(item))
}
