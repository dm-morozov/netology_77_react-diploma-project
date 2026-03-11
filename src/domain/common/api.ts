export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  'https://netology-77-react-diploma-project.onrender.com/api'

// Так как запросы у нас повторяются, вынесем в отдельную функцию использую дженерик T
export const requestJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url)

  // По заданию нужно обработать ошибку
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  const data = (await response.json()) as T
  return data
}
