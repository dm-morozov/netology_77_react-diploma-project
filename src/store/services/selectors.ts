// В архитектуре Redux селекторы - это чистые функции,
// которые принимают на вход весь объект состояния (state)
// и возвращают только нужную его часть.
// Компоненты читают состояние через селекторы
// Если структура state поменяется, правим селекторы, UI почти не трогаем

import type { RootState } from '../../app/store'

// Базовые селекторы уровней
export const selectServicesList = (state: RootState) => {
  return state.services.list
}

export const selectServicesDetails = (state: RootState) => {
  return state.services.details
}

// Селекторы для Списка (List)
export const selectServicesListData = (state: RootState) =>
  state.services.list.data
export const selectServicesListLoading = (state: RootState) =>
  state.services.list.loading
export const selectServicesListError = (state: RootState) =>
  state.services.list.error

// Селекторы для Деталей (Details)
export const selectServiceDetailsData = (state: RootState) =>
  state.services.details.data
export const selectServiceDetailsLoading = (state: RootState) =>
  state.services.details.loading
export const selectServiceDetailsError = (state: RootState) =>
  state.services.details.error
