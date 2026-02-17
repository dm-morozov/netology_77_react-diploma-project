import { Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<div>Home Page</div>} />
        <Route path="catalog.html" element={<div>Catalog Page</div>} />
        <Route path="about.html" element={<div>About Page</div>} />
        <Route path="contacts.html" element={<div>Contacts Page</div>} />
        <Route path="cart.html" element={<div>Cart Page</div>} />
        <Route path="catalog/:id.html" element={<div>Product Page</div>} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  )
}

export default App
