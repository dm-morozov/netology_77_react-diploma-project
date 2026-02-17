import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectServicesListData,
  selectServicesListError,
  selectServicesListLoading,
} from '../../store/services/selectors'
import { useEffect } from 'react'
import { listRequested } from '../../store/services/actions'
import Spinner from '../../components/Spinner/Spinner'
import ErrorView from '../../components/ErrorView/ErrorView'

const ServicesListPage = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectServicesListData)
  const loading = useAppSelector(selectServicesListLoading)
  const error = useAppSelector(selectServicesListError)

  useEffect(() => {
    dispatch(listRequested())
  }, [dispatch])

  const handleRetry = () => {
    dispatch(listRequested())
  }

  if (loading) return <Spinner />
  if (error) return <ErrorView message={error} onRetry={handleRetry} />

  return (
    <div>
      <h2>Список услуг</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <Link to={`/${item.id}/details`}>
              {item.name} — {item.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ServicesListPage
