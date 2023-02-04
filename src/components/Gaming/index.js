import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'

import Header from '../Header'
import LeftSideBar from '../LeftSideBar'
import GamingVideoItem from '../GamingVideoItem'
import NxtWatchContext from '../../context'
import {HomeDiv} from '../Home/styledComponents'

const componentStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Gaming extends Component {
  state = {gamingVideosList: [], status: componentStatus.initial}

  componentDidMount() {
    this.getTrendingVideos()
  }

  fetchSuccessFunction = data => {
    const updatedGamingVideosList = data.videos.map(each => ({
      id: each.id,
      thumbnailUrl: each.thumbnail_url,
      title: each.title,
      viewCount: each.view_count,
    }))
    // console.log(updatedTrendingVideosList)
    this.setState({
      gamingVideosList: updatedGamingVideosList,
      status: componentStatus.success,
    })
  }

  getTrendingVideos = async () => {
    this.setState({status: componentStatus.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      //   console.log(data)
      this.fetchSuccessFunction(data)
    } else {
      this.setState({status: componentStatus.failure})
    }
  }

  successViewFunction = isDarkMode => {
    const {gamingVideosList} = this.state
    return (
      <div className="col-12 mt-3 mb-5">
        <div
          data-testid="banner"
          className={
            isDarkMode
              ? 'bgFillFire d-flex align-items-center p-3 mb-5 text-light'
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
            <SiYoutubegaming className="h1 m-0 text-danger" />
          </div>
          <h1 className="m-0">Gaming</h1>
        </div>
        <ul className="mt-3 videos_container list-unstyled">
          {gamingVideosList.map(each => (
            <GamingVideoItem key={each.id} eachVideo={each} />
          ))}
        </ul>
      </div>
    )
  }

  onClickRetryButton = () => {
    this.getTrendingVideos()
  }

  failureViewFunction = isDarkMode => (
    <div className="mt-5 mb-5 d-flex flex-column justify-content-center align-items-center">
      <div className="w-50 mb-2 text-center">
        <img
          className="w-75"
          src={
            isDarkMode
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
          }
          alt="failure view"
        />
      </div>
      <h1>Oops! Something Went Wrong</h1>
      <p className="h5 text-secondary">
        We are having some trouble to complete your request.
      </p>
      <p className="h5 text-secondary">Please try again</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  inProgressViewFunction = () => (
    <div className="flexGrow vh-100 d-flex justify-content-center align-items-center">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="blue" height="50" width="50" />
      </div>
    </div>
  )

  switchFunction = isDarkMode => {
    const {status} = this.state
    // console.log(status)

    switch (status) {
      case componentStatus.success:
        return this.successViewFunction(isDarkMode)
      case componentStatus.failure:
        return this.failureViewFunction(isDarkMode)
      case componentStatus.inProgress:
        return this.inProgressViewFunction()
      default:
        return null
    }
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkMode} = value
          return (
            <div className="bg_container">
              <div className="main_container ">
                <Header />
                <div className="d-flex vh-100">
                  <LeftSideBar />
                  <HomeDiv
                    home={isDarkMode}
                    data-testid="gaming"
                    className={
                      isDarkMode
                        ? 'col-10 overflow-auto trendingColor'
                        : 'col-10 overflow-auto'
                    }
                  >
                    {this.switchFunction(isDarkMode)}
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

export default Gaming
