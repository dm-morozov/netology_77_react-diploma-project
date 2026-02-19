import { API_BASE_URL, requestJson } from '../common/api'
import type { ProductShop } from './types'

export const getTopSales = (): Promise<ProductShop[]> => {
  return requestJson<ProductShop[]>(`${API_BASE_URL}/top-sales`)
}
