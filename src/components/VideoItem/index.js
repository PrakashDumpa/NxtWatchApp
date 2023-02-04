import './index.css'
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import NxtWatchContext from '../../context'

const VideoItem = props => (
  //   console.log(props)
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
      const {profileImageUrl, name} = channel

      return (
        <li className="col-4 mb-5 ">
          <Link to={`/videos/${id}`} className="nav-item text-secondary">
            <div className="video_container">
              <img className="w-100" src={thumbnailUrl} alt="video thumbnail" />
              <div className="d-flex justify-content-between pt-3">
                <div className="text-center">
                  <img
                    src={profileImageUrl}
                    alt="channel logo"
                    className="w-50"
                  />
                </div>
                <div className={isDarkMode ? 'text-light' : 'text-dark'}>
                  <p className="h5">{title}</p>
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
            </div>
          </Link>
        </li>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default VideoItem
