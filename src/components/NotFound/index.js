import './index.css'
import Header from '../Header'
import LeftSideBar from '../LeftSideBar'
import NxtWatchContext from '../../context'

const NotFound = () => {
  const notFoundFunction = isDarkMode => (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="w-50 text-center">
        <img
          className="w-75"
          src={
            isDarkMode
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
          }
          alt="not found"
        />
      </div>
      <div className="mt-3 text-center">
        <h1 className={isDarkMode ? 'text-light' : 'text-dark'}>
          Page Not Found
        </h1>
        <p className={isDarkMode ? 'text-light h6' : 'text-secondary h6'}>
          we are sorry, the page you requested could not be found.
        </p>
      </div>
    </div>
  )

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkMode} = value
        return (
          <div className="bg_container">
            <div className="main_container ">
              <Header />
              <div className="d-flex min-vh-100">
                <LeftSideBar />
                <div className={isDarkMode ? 'col-10 trendingColor' : 'col-10'}>
                  {notFoundFunction(isDarkMode)}
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}
export default NotFound
