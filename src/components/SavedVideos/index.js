import {Component} from 'react'
import {AiFillFire} from 'react-icons/ai'
import './index.css'
import Header from '../Header'
import LeftSideBar from '../LeftSideBar'
import NxtWatchContext from '../../context'
import TrendingVideoItem from '../TrendingVideoItem'
import {HomeDiv} from '../Home/styledComponents'

class SavedVideos extends Component {
  SavedVideosFunction = (savedVideosList, isDarkMode) => (
    <div>
      {savedVideosList.length > 0 ? (
        <div className="col-12 mt-3 mb-5">
          <div
            data-testid="banner"
            className={
              isDarkMode
                ? 'bgFillFire d-flex align-items-center p-3 mb-5'
                : 'bgColor d-flex align-items-center p-3 mb-5'
            }
          >
            <div
              className={
                isDarkMode
                  ? 'trendingColor p-3 ml-5 mr-2 rounded-circle'
                  : 'bgColorFire p-3 ml-5 mr-2 rounded-circle'
              }
            >
              <AiFillFire className="h1 m-0 text-danger" />
            </div>
            <h1 className={isDarkMode ? 'm-0 text-light' : 'text-dark m-0'}>
              Saved Videos
            </h1>
          </div>
          <ul className="mt-3 videos_container list-unstyled">
            {savedVideosList.map(each => (
              <TrendingVideoItem key={each.id} eachVideo={each} />
            ))}
          </ul>
        </div>
      ) : (
        <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
          <div className="w-50 text-center">
            <img
              className="w-100"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
            />
          </div>
          <div className="mt-3 text-center">
            <h4 className={isDarkMode ? 'text-light' : 'text-dark'}>
              No saved videos found
            </h4>
            <p className={isDarkMode ? 'text-light' : 'text-secondary'}>
              You can save your videos while watching them
            </p>
          </div>
        </div>
      )}
    </div>
  )

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {savedVideosList, isDarkMode} = value
          return (
            <div className="bg_container">
              <div className="main_container ">
                <Header />
                <div className="d-flex min-vh-100">
                  <LeftSideBar />
                  <HomeDiv
                    home={isDarkMode}
                    data-testid="savedVideos"
                    className={isDarkMode ? 'col-10 trendingColor' : 'col-10'}
                  >
                    {this.SavedVideosFunction(savedVideosList, isDarkMode)}
                  </HomeDiv>
                </div>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default SavedVideos
