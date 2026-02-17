// Пишем функции запросов:
// getServices()
// getServiceById(id)

import type { ServiceDetails, ServiceListItem } from './types'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:7070/api/services'

// Так как запросы у нас повторяются, вынесем в отдельную функцию использую дженерик T
const requestJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url)

  // По заданию нужно обработать ошибку
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  const data = (await response.json()) as T
  return data
}

export const getServices = (): Promise<ServiceListItem[]> => {
  return requestJson<ServiceListItem[]>(API_BASE_URL)
}

export const getServiceById = (id: number): Promise<ServiceDetails> => {
  return requestJson<ServiceDetails>(`${API_BASE_URL}/${id}`)
}
