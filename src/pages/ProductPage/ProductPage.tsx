import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useEffect, useMemo, useState } from 'react'
import ErrorView from '../../components/ErrorView/ErrorView'
import {
  productDetailsRequested,
  productDetailsReset,
} from '../../features/ProductDetails/productDetailsSlice'
import Spinner from '../../components/Spinner/Spinner'

const ProductPage = () => {
  const { id } = useParams() // Получаем id из URL, например, /product/123 -> id будет 123, приходит всегда строка
  const navigate = useNavigate() // Хук для навигации, если нужно будет перенаправить пользователя
  const dispatch = useAppDispatch()

  const { item, isLoading, error } = useAppSelector(
    (state) => state.productDetails,
  )

  // Приходит всегда строка в useParams()
  const numericId = Number(id)

  // Локальный State: размер и количество
  const [selectedSize, setSelectedSize] = useState<string | null>(null) // размер пока не выбран
  const [count, setCount] = useState<number>(1) // количество 1

  useEffect(() => {
    // Проверяем, что id является числом
    if (!Number.isFinite(numericId)) return

    dispatch(productDetailsRequested(numericId))

    return () => {
      dispatch(productDetailsReset())
    }
  }, [dispatch, numericId])

  // Чтобы при переходе на другой товар размер и количество не сохранялись
  useEffect(() => {
    setSelectedSize(null)
    setCount(1)
  }, [item?.id]) // При переходе на другой товар item.id будет изменяться

  // Функция для получения доступных размеров
  const availableSizes = useMemo(
    () => item?.sizes?.filter((s) => s.available) ?? [],
    [item?.sizes],
  )

  if (!Number.isFinite(numericId)) {
    return <ErrorView message="Некорректный id товара" />
  }

  if (isLoading) return <Spinner />

  if (error) {
    return (
      <ErrorView
        message={error}
        onRetry={() => dispatch(productDetailsRequested(numericId))}
      />
    )
  }

  if (!item) return null

  const canAddToCart = availableSizes?.length > 0 && selectedSize !== null

  return (
    <section className="catalog-item">
      <h2 className="text-center">{item.title}</h2>
      <div className="row">
        <div className="col-5">
          <img src={item.images[0]} className="img-fluid" alt={item.title} />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{item.sku ?? ''}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{item.manufacturer ?? ''}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{item.color ?? ''}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{item.material ?? ''}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{item.season ?? ''}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{item.reason ?? ''}</td>
              </tr>
            </tbody>
          </table>

          {availableSizes.length > 0 && (
            <>
              <div className="text-center">
                <p>
                  Размеры в наличии:{' '}
                  {availableSizes.map((size) => (
                    <span
                      key={size.size}
                      className={`catalog-item-size ${selectedSize === size.size ? 'selected' : ''}`}
                      onClick={() =>
                        setSelectedSize((prev) =>
                          prev === size.size ? null : size.size,
                        )
                      }
                    >
                      {size.size}
                    </span>
                  ))}
                </p>
                <p>
                  Количество:{' '}
                  <span className="btn-group btn-group-sm pl-2">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() =>
                        setCount((count) => Math.max(1, count - 1))
                      }
                    >
                      -
                    </button>
                    <span className="btn btn-outline-primary">{count}</span>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() =>
                        setCount((count) => Math.min(10, count + 1))
                      }
                    >
                      +
                    </button>
                  </span>
                </p>
              </div>
              <button
                type="button"
                className="btn btn-danger btn-block btn-lg"
                disabled={!canAddToCart}
                onClick={() => navigate('/cart.html')}
              >
                В корзину
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductPage
