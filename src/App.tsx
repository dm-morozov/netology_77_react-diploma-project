import { Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import AboutPage from './pages/AboutPage/AboutPage'
import CartPage from './pages/CartPage/CartPage'
import CatalogPage from './pages/CatalogPage/CatalogPage'
import ContactsPage from './pages/ContactsPage/ContactsPage'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import ProductPage from './pages/ProductPage/ProductPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog.html" element={<CatalogPage />} />
        <Route path="about.html" element={<AboutPage />} />
        <Route path="contacts.html" element={<ContactsPage />} />
        <Route path="cart.html" element={<CartPage />} />
        <Route path="catalog/:id.html" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
