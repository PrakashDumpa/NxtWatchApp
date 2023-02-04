import './index.css'
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import NxtWatchContext from '../../context'

const TrendingVideoItem = props => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkMode} = value
      const {eachVideo} = props
      const {
        id,
        channel,
        publishedAt,
        thumbnailUrl,
        title,
        viewCount,
      } = eachVideo
      const {name} = channel
      // console.log('TrendingVideoItem', isDarkMode)
      return (
        <li className="col-12 mb-5 ">
          <Link to={`/videos/${id}`} className="nav-item">
            <div className="w-100 d-flex">
              <div className="col-5">
                <img
                  className="w-100"
                  src={thumbnailUrl}
                  alt="video thumbnail"
                />
              </div>
              <div className="col-7">
                <p className={isDarkMode ? 'text-light h5' : 'text-dark h5'}>
                  {title}
                </p>
                <div className={isDarkMode ? 'text-light' : 'text-secondary'}>
                  <p className="m-0 pb-2">{name}</p>
                  <div className="p-0 d-flex">
                    <p className="m-0">{viewCount} views</p>
                    <div className="d-flex">
                      <p className="ml-2">
                        . {formatDistanceToNow(new Date(publishedAt))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default TrendingVideoItem
