import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { removeFromCart } from '../../features/Cart/cartSlice'
import ErrorView from '../../components/ErrorView/ErrorView'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { orderRequested, orderReset } from '../../features/Order/orderSlice'
import { formatPhone } from '../../domain/common/formatPhone'

const CartPage = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)
  const total = items.reduce((acc, item) => acc + item.price * item.count, 0)

  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [agreement, setAgreement] = useState(false)

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formatedPhone = formatPhone(event.target.value)
    setPhone(formatedPhone)
  }

  const {
    success: isOrderSuccess,
    isLoading: isOrderLoading,
    error: orderError,
  } = useAppSelector((state) => state.order)

  const submitOrder = () => {
    if (!agreement) return
    if (!phone.trim() || !address.trim()) return
    if (items.length === 0) return

    dispatch(
      orderRequested({
        owner: {
          phone: `+${phone.trim().replace(/\D/g, '')}`,
          address: address.trim(),
        },
        items: items.map((item) => ({
          id: item.id,
          price: item.price,
          count: item.count,
        })),
      }),
    )
  }

  const handleSubmitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitOrder()
  }

  useEffect(() => {
    if (!isOrderSuccess) return
    const timeoutId = setTimeout(() => {
      dispatch(orderReset())
    }, 3000)
    return () => clearTimeout(timeoutId)
  }, [dispatch, isOrderSuccess])

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        {items.length > 0 ? (
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
        ) : !isOrderSuccess ? (
          <ErrorView message="Корзина пуста" />
        ) : null}
      </section>
      {items.length > 0 && (
        <section className="order">
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
            <form className="card-body" onSubmit={handleSubmitOrder}>
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  value={phone}
                  onChange={(event) => {
                    handlePhoneChange(event)
                  }}
                  className="form-control"
                  id="phone"
                  placeholder="Ваш телефон"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className="form-control"
                  id="address"
                  placeholder="Адрес доставки"
                />
              </div>
              <div className="form-group form-check">
                <input
                  onChange={(event) => setAgreement(event.target.checked)}
                  checked={agreement}
                  type="checkbox"
                  className="form-check-input"
                  id="agreement"
                />
                <label className="form-check-label" htmlFor="agreement">
                  Согласен с правилами доставки
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-outline-secondary"
                disabled={
                  isOrderLoading ||
                  !agreement ||
                  !phone.trim() ||
                  !address.trim()
                }
              >
                {isOrderLoading ? 'Оформляем...' : 'Оформить'}
              </button>
            </form>
            {orderError && (
              <ErrorView message={orderError} onRetry={() => submitOrder()} />
            )}
          </div>
        </section>
      )}
      {isOrderSuccess && (
        <div className="alert alert-success text-center mt-3">
          Заказ успешно оформлен
        </div>
      )}
    </>
  )
}

export default CartPage
