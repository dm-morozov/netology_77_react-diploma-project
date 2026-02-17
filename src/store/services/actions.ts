import { createAction } from '@reduxjs/toolkit'
import type {
  ServiceDetails,
  ServiceListItem,
} from '../../domain/service/types'

export const listRequested = createAction('services/listRequested')
export const listSucceeded = createAction<ServiceListItem[]>(
  'services/listSucceeded',
)
export const listFailed = createAction<string>('services/listFailed')

export const detailsRequested = createAction<number>(
  'services/detailsRequested',
)
export const detailsSucceeded = createAction<ServiceDetails>(
  'services/detailsSucceeded',
)
export const detailsFailed = createAction<string>('services/detailsFailed')
