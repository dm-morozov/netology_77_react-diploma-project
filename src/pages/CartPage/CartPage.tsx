import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { removeFromCart } from '../../features/Cart/cartSlice'
import ErrorView from '../../components/ErrorView/ErrorView'

const CartPage = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)
  const total = items.reduce((acc, item) => acc + item.price * item.count, 0)

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        {(items.length === 0 && <ErrorView message="Корзина пуста" />) || (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Название</th>
                <th scope="col">Размер</th>
                <th scope="col">Кол-во</th>
                <th scope="col">Стоимость</th>
                <th scope="col">Итого</th>
                <th scope="col">Действия</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={`${item.id}-${item.size}`}>
                  <td scope="row">{index + 1}</td>
                  <td>
                    <Link to={`/catalog/${item.id}.html`}>{item.title}</Link>
                  </td>
                  <td>{item.size}</td>
                  <td>{item.count}</td>
                  <td>{item.price} руб.</td>
                  <td>{item.price * item.count} руб.</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() =>
                        dispatch(
                          removeFromCart({ id: item.id, size: item.size }),
                        )
                      }
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={5} className="text-right">
                  Общая стоимость
                </td>
                <td>{total} руб.</td>
              </tr>
            </tbody>
          </table>
        )}
      </section>
      {items.length > 0 && (
        <section className="order">
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
            <form className="card-body">
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  className="form-control"
                  id="phone"
                  placeholder="Ваш телефон"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input
                  className="form-control"
                  id="address"
                  placeholder="Адрес доставки"
                />
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="agreement"
                />
                <label className="form-check-label" htmlFor="agreement">
                  Согласен с правилами доставки
                </label>
              </div>
              <button type="submit" className="btn btn-outline-secondary">
                Оформить
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  )
}

export default CartPage
