import sandalsMyer from '/img/products/sandals_myer.jpg'
import sandalsKeira from '/img/products/sandals_keira.jpg'
import superheroSneakers from '/img/products/superhero_sneakers.jpg'
import { Link, NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useEffect } from 'react'
import {
  activeCategoryChanged,
  categoriesRequested,
} from '../../features/Categories/categoriesSlice'

const CatalogPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(categoriesRequested())
  }, [dispatch])

  const { items, activeCategoryId, error, isLoading } = useAppSelector(
    (state) => state.categories,
  )

  const allCategories = [{ id: 0, title: 'Все' }, ...items]

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <form className="catalog-search-form form-inline">
        <input className="form-control" placeholder="Поиск" />
      </form>

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
      <div className="row">
        <div className="col-4">
          <div className="card catalog-item-card">
            <img
              src={sandalsMyer}
              className="card-img-top img-fluid"
              alt="Босоножки 'MYER'"
            />
            <div className="card-body">
              <p className="card-text">Босоножки 'MYER'</p>
              <p className="card-text">34 000 руб.</p>
              <Link to="/catalog/1.html" className="btn btn-outline-primary">
                Заказать
              </Link>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card catalog-item-card">
            <img
              src={sandalsKeira}
              className="card-img-top img-fluid"
              alt="Босоножки 'Keira'"
            />
            <div className="card-body">
              <p className="card-text">Босоножки 'Keira'</p>
              <p className="card-text">7 600 руб.</p>
              <Link to="/catalog/1.html" className="btn btn-outline-primary">
                Заказать
              </Link>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card catalog-item-card">
            <img
              src={superheroSneakers}
              className="card-img-top img-fluid"
              alt="Супергеройские кеды"
            />
            <div className="card-body">
              <p className="card-text">Супергеройские кеды</p>
              <p className="card-text">1 400 руб.</p>
              <Link to="/catalog/1.html" className="btn btn-outline-primary">
                Заказать
              </Link>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card catalog-item-card">
            <img
              src={sandalsMyer}
              className="card-img-top img-fluid"
              alt="Босоножки 'MYER'"
            />
            <div className="card-body">
              <p className="card-text">Босоножки 'MYER'</p>
              <p className="card-text">34 000 руб.</p>
              <Link to="/catalog/1.html" className="btn btn-outline-primary">
                Заказать
              </Link>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card catalog-item-card">
            <img
              src={sandalsKeira}
              className="card-img-top img-fluid"
              alt="Босоножки 'Keira'"
            />
            <div className="card-body">
              <p className="card-text">Босоножки 'Keira'</p>
              <p className="card-text">7 600 руб.</p>
              <Link to="/catalog/1.html" className="btn btn-outline-primary">
                Заказать
              </Link>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card catalog-item-card">
            <img
              src={superheroSneakers}
              className="card-img-top img-fluid"
              alt="Супергеройские кеды"
            />
            <div className="card-body">
              <p className="card-text">Супергеройские кеды</p>
              <p className="card-text">1 400 руб.</p>
              <Link to="/catalog/1.html" className="btn btn-outline-primary">
                Заказать
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button className="btn btn-outline-primary">Загрузить ещё</button>
      </div>
    </section>
  )
}

export default CatalogPage
