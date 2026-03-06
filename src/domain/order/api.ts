import { API_BASE_URL } from '../common/api'
import type { OrderPayload } from './types'

export const postOrder = async (payload: OrderPayload): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/order`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }
}
