import './index.css'
import {Link} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import NxtWatchContext from '../../context'

const leftSideBarItemsList = [
  {
    id: uuidv4(),
    displayText: 'Home',
    ReactIcon: <AiFillHome className="h4 m-0" />,
    path: '/',
  },
  {
    id: uuidv4(),
    displayText: 'Trending',
    ReactIcon: <AiFillFire className="h4 m-0" />,
    path: '/trending',
  },
  {
    id: uuidv4(),
    displayText: 'Gaming',
    ReactIcon: <SiYoutubegaming className="h4 m-0" />,
    path: '/gaming',
  },
  {
    id: uuidv4(),
    displayText: 'Saved videos',
    ReactIcon: <MdPlaylistAdd className="h4 m-0" />,
    path: '/saved-videos',
  },
]

const LeftSideBar = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {currentRoute, isDarkMode} = value

      return (
        <div
          className={
            isDarkMode
              ? 'text-light color col-2 d-flex flex-column justify-content-between'
              : 'col-2 d-flex flex-column justify-content-between'
          }
        >
          <ul className="list-unstyled mt-3">
            {leftSideBarItemsList.map(each => (
              <li key={each.id} className="">
                <Link
                  to={each.path}
                  className={
                    each.path === currentRoute
                      ? 'text-danger nav-item d-flex align-items-center activeColor p-3 '
                      : 'text-secondary nav-item d-flex align-items-center p-3 '
                  }
                >
                  {each.ReactIcon}
                  <p
                    className={
                      isDarkMode
                        ? 'text-light m-0 h6 ml-3 pt-1'
                        : 'text-secondary m-0 h6 ml-3 pt-1'
                    }
                  >
                    {each.displayText}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mb-5">
            <p className="h5">CONTACT US</p>
            <div className="mt-3 d-flex">
              <div>
                <img
                  className="w-50"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                />
              </div>
              <div>
                <img
                  className="w-50"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                />
              </div>
              <div>
                <img
                  className="w-50"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                />
              </div>
            </div>
            <p
              className={
                isDarkMode ? 'mt-3 h6 text-light' : 'mt-3 h6 text-secondary'
              }
            >
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default LeftSideBar
