import {FaMoon} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import './index.css'
import NxtWatchContext from '../../context'

const Header = props => {
  const onClickLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const popUpFunction = isDarkMode => (
    <Popup
      modal
      trigger={
        <button
          className="btn btn-outline-primary font-weight-bold pr-3 pl-3 pt-1 pb-1"
          type="button"
        >
          Logout
        </button>
      }
      className="opacity"
    >
      {close => (
        <div className="popUpParent">
          <div
            className={
              isDarkMode
                ? 'bg-dark p-5 popup-content '
                : 'bg-light p-5 popup-content '
            }
          >
            <p
              className={
                isDarkMode ? 'text-light mb-4 h4' : 'text-info mb-4 h4'
              }
            >
              Are you sure, you want to logout
            </p>
            <div className="d-flex justify-content-around">
              <button
                type="button"
                className={
                  isDarkMode ? 'btn btn-outline-light' : 'btn btn-outline-dark'
                }
                onClick={close}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onClickLogoutButton}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  )

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {setIsDarkMode, isDarkMode} = value

        const onClickDarkModeFunction = () => {
          setIsDarkMode()
        }
        return (
          <nav
            className={
              isDarkMode ? 'bg-dark p-3 nav_container' : 'p-3 nav_container'
            }
          >
            <div className="logo_container">
              <Link to="/">
                <img
                  className="w-100"
                  src={
                    isDarkMode
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                />
              </Link>
            </div>
            <ul className="list-unstyled d-flex justify-content-around align-items-center m-0">
              <li className="mr-5 m-0">
                <button
                  type="button"
                  data-testid="theme"
                  className={
                    isDarkMode
                      ? 'btn p-0 btn btn-dark border:none'
                      : 'btn p-0 btn btn-light border:none'
                  }
                  onClick={onClickDarkModeFunction}
                >
                  {isDarkMode ? (
                    <FiSun className="h3 m-0" />
                  ) : (
                    <FaMoon className="h3 m-0" />
                  )}
                </button>
              </li>

              <li className="profile_container m-0 mr-5">
                <img
                  className="w-100"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />
              </li>
              <li className="m-0">{popUpFunction(isDarkMode)}</li>
            </ul>
          </nav>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default withRouter(Header)
