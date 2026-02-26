import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { topSalesRequested } from '../../features/TopSales/topSalesSlice'
import { Link } from 'react-router-dom'
import CatalogSection from '../../components/catalog/CatalogSection'
import ErrorView from '../../components/ErrorView/ErrorView'
import Spinner from '../../components/Spinner/Spinner'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const { items, isLoading, error } = useAppSelector((state) => state.topSales)

  useEffect(() => {
    dispatch(topSalesRequested())
  }, [dispatch])

  return (
    <>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>

        {isLoading && <Spinner />}

        {error && (
          <ErrorView
            message={error}
            onRetry={() => dispatch(topSalesRequested())}
          />
        )}

        {!isLoading && !error && (
          <div className="row">
            {items.map((item) => (
              <div className="col-4" key={item.id}>
                <div className="card catalog-item-card">
                  <img
                    src={item.images[0]}
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
      </section>

      <CatalogSection />
    </>
  )
}

export default HomePage
