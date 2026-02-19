import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { topSalesRequested } from '../../features/TopSales/topSalesSlice'
import { Link } from 'react-router-dom'

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

        {isLoading && (
          <div className="preloader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

        {error && <div className="text-center text-danger">{error}</div>}

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

      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        {/* {Позже заменим на отдельный state каталога} */}
        {isLoading && (
          <div className="preloader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </section>
    </>
  )
}

export default HomePage
