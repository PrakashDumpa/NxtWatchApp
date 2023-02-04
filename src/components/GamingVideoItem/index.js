import './index.css'
import {Link} from 'react-router-dom'
import NxtWatchContext from '../../context'

const GamingVideoItem = props => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkMode} = value
      const {eachVideo} = props
      const {id, thumbnailUrl, title, viewCount} = eachVideo

      return (
        <li className="col-4 mb-5 ">
          <Link to={`/videos/${id}`} className="nav-item text-secondary">
            <div className="w-100">
              <div className="">
                <img
                  className="w-100"
                  src={thumbnailUrl}
                  alt="video thumbnail"
                />
              </div>
              <div
                className={isDarkMode ? 'text-light mt-3' : 'text-dark mt-3'}
              >
                <p className="h5">{title}</p>
                <p className={isDarkMode ? 'text-light' : 'text-secondary'}>
                  {viewCount} Watching Worldwide
                </p>
              </div>
            </div>
          </Link>
        </li>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default GamingVideoItem
