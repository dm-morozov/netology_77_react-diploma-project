export interface ServiceListItem {
  id: number
  name: string
  price: number
}

export interface ServiceDetails extends ServiceListItem {
  content: string
}

export interface AsyncSliceState<T> {
  data: T
  loading: boolean
  error: string | null
}

export interface ServicesState {
  list: AsyncSliceState<ServiceListItem[]>
  details: AsyncSliceState<ServiceDetails | null>
}
