import { API_BASE_URL, requestJson } from '../common/api'
import type { Category, ProductShop } from './types'

export interface GetItemsParams {
  categoryId?: number
  offset?: number
  q?: string
}

export const getTopSales = (): Promise<ProductShop[]> => {
  return requestJson<ProductShop[]>(`${API_BASE_URL}/top-sales`)
}

export const getCategories = (): Promise<Category[]> => {
  return requestJson<Category[]>(`${API_BASE_URL}/categories`)
}

export const getItems = (
  params: GetItemsParams = {},
): Promise<ProductShop[]> => {
  const searchParams = new URLSearchParams()

  if (params.categoryId !== undefined && params.categoryId > 0) {
    searchParams.set('categoryId', String(params.categoryId))
  }
  if (params.offset && params.offset > 0) {
    searchParams.set('offset', String(params.offset))
  }
  if (params.q && params.q.trim() !== '') {
    searchParams.set('q', params.q.trim())
  }

  const query = searchParams.toString()
  const url = query ? `${API_BASE_URL}/items?${query}` : `${API_BASE_URL}/items`

  return requestJson<ProductShop[]>(url)
}
