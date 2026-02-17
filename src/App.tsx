import { Route, Routes } from 'react-router-dom'
import './App.css'
import ServicesListPage from './pages/ServicesListPage/ServicesListPage'
import ServiceDetailsPage from './pages/ServiceDetailsPage/ServiceDetailsPage'

function App() {
  return (
    <>
      <h1 className="title">Redux Saga</h1>
      <Routes>
        <Route path="/" element={<ServicesListPage />} />
        <Route path="/:id/details" element={<ServiceDetailsPage />} />
      </Routes>
    </>
  )
}

export default App
