import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img
              src="./img/banner.jpg"
              className="img-fluid"
              alt="К весне готовы!"
            />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <Outlet />
        </div>
      </div>
    </main>
  )
}

export default Main
