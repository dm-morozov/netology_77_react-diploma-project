import { Link, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import {
  activeCategoryChanged,
  categoriesRequested,
} from '../../features/Categories/categoriesSlice'

import {
  catalogLoadMoreRequested,
  catalogRequested,
  catalogSearchChanged,
} from '../../features/Catalog/catalogSlice'
import Spinner from '../Spinner/Spinner'
import ErrorView from '../ErrorView/ErrorView'

interface CatalogSectionProps {
  withSearch?: boolean
  title?: string
}

const CatalogSection = ({
  withSearch = false, // По умолчанию секция каталога не имеет поискового поля
  title = 'Каталог',
}: CatalogSectionProps) => {
  const dispatch = useAppDispatch()

  const {
    items: categoryItems,
    activeCategoryId,
    error: categoriesError,
    isLoading: isCategoriesLoading,
  } = useAppSelector((state) => state.categories)

  const {
    items: catalogItems,
    isLoading: isCatalogLoading,
    isLoadingMore,
    error: catalogError,
    hasMore,
  } = useAppSelector((state) => state.catalog)

  const allCategories = [{ id: 0, title: 'Все' }, ...categoryItems]

  const [searchParams, setSearchParams] = useSearchParams()
  const queryFromUrl = searchParams.get('q')?.trim() ?? ''

  useEffect(() => {
    dispatch(categoriesRequested())
  }, [dispatch])

  useEffect(() => {
    if (!withSearch) return

    setValueInput(queryFromUrl)
    dispatch(catalogSearchChanged(queryFromUrl))
    dispatch(catalogRequested())
  }, [dispatch, withSearch, queryFromUrl, activeCategoryId])

  useEffect(() => {
    if (withSearch) return

    dispatch(catalogSearchChanged(''))
    dispatch(catalogRequested())
  }, [dispatch, withSearch, activeCategoryId])

  const [valueInput, setValueInput] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setValueInput(value)

    if (!value.trim()) {
      setSearchParams({}, { replace: true })
    }
  }

  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const q = valueInput.trim()

    if (!q) {
      setSearchParams({}, { replace: true })
      dispatch(catalogRequested())
      return
    }

    setSearchParams({ q }, { replace: true })
    dispatch(catalogRequested())
  }

  return (
    <section className="catalog">
      <h2 className="text-center">{title}</h2>
      {withSearch && (
        <form
          className="catalog-search-form form-inline"
          onSubmit={handleSubmitSearch}
        >
          <input
            value={valueInput}
            type="search"
            className="form-control"
            placeholder="Поиск"
            onChange={handleInputChange}
          />
        </form>
      )}
      {isCategoriesLoading && <Spinner />}
      {categoriesError && (
        <ErrorView
          message={categoriesError}
          onRetry={() => dispatch(categoriesRequested())}
        />
      )}
      {!isCategoriesLoading && !categoriesError && (
        <ul className="catalog-categories nav justify-content-center">
          {allCategories.map((item) => (
            <li className="nav-item" key={item.id}>
              <a
                className={`nav-link ${item.id === activeCategoryId ? 'active' : ''}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  dispatch(activeCategoryChanged(item.id))
                }}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      {isCatalogLoading && <Spinner />}

      {catalogError && (
        <ErrorView
          message={catalogError}
          onRetry={() => dispatch(catalogRequested())}
        />
      )}

      {!isCatalogLoading && !catalogError && (
        <div className="row">
          {catalogItems.map((item) => (
            <div className="col-4" key={item.id}>
              <div className="card catalog-item-card">
                <img
                  src={
                    item.images?.[0] ||
                    `https://placehold.co/215x286/ffffff/000000?text=${encodeURIComponent(item.title)}`
                  }
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = `https://placehold.co/215x286/ffffff/000000?text=${encodeURIComponent(item.title)}`
                  }}
                  className="card-img-top img-fluid"
                  alt={item.title}
                />
                <div className="card-body">
                  <p className="card-text">{item.title}</p>
                  <p className="card-text">{item.price} руб.</p>
                  <Link
                    to={`/catalog/${item.id}.html`}
                    className="btn btn-outline-primary"
                  >
                    Заказать
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {isLoadingMore && <Spinner />}
      {!isCatalogLoading && !catalogError && hasMore && (
        <div className="text-center">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => dispatch(catalogLoadMoreRequested())}
            disabled={isLoadingMore}
          >
            Загрузить ещё
          </button>
        </div>
      )}
    </section>
  )
}

export default CatalogSection
