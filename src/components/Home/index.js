import {Component} from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import './index.css'
import Cookies from 'js-cookie'
import Header from '../Header'
import LeftSideBar from '../LeftSideBar'
import VideoItem from '../VideoItem'
import NxtWatchContext from '../../context'
import {Banner, HomeDiv} from './styledComponents'

const componentStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    status: componentStatus.initial,
    isShowBannerSection: true,
    videosList: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getVideosList()
  }

  fetchSuccessFunction = data => {
    const updatedVideosList = data.videos.map(each => ({
      channel: {
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
      },
      id: each.id,
      publishedAt: each.published_at,
      thumbnailUrl: each.thumbnail_url,
      title: each.title,
      viewCount: each.view_count,
    }))
    // console.log(updatedVideosList)
    this.setState({
      videosList: updatedVideosList,
      status: componentStatus.success,
    })
  }

  getVideosList = async () => {
    this.setState({status: componentStatus.inProgress})

    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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

  onClickCrossButton = () => {
    this.setState({isShowBannerSection: false})
  }

  bannerSection = () => (
    <Banner className="banner_section_container p-3 mt-3" data-testid="banner">
      <div className="p-2 col-6">
        <div className="home_logo_container">
          <img
            className="w-100"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="nxt watch logo"
          />
        </div>
        <p className="text-secondary h4 mt-3">
          Buy Nxt Watch Premium prepaid plans with UPI
        </p>
        <button type="button" className="btn btn-outline-dark mt-5">
          GET IT NOW
        </button>
      </div>
      <div className="d-flex justify-content-end align-items-start flexGrow">
        <button
          data-testid="close"
          type="button"
          className="crossButton"
          onClick={this.onClickCrossButton}
        >
          <AiOutlineClose />
        </button>
      </div>
    </Banner>
  )

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    this.setState({status: componentStatus.inProgress}, this.getVideosList)
  }

  onEnterKeyButton = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.setState({status: componentStatus.inProgress}, this.getVideosList)
    }
  }

  searchFunction = () => {
    const {searchInput} = this.state
    return (
      <nav className="navbar navbar-light">
        <form className="search_container">
          <div className="input-group">
            <input
              type="search"
              className="form-control"
              placeholder="Search"
              onChange={this.onChangeSearchInput}
              value={searchInput}
              onKeyDown={this.onEnterKeyButton}
            />
            <div className="input-group-prepend">
              <button
                data-testid="searchButton"
                type="button"
                className="input-group-text btn btn-light"
                id="basic-addon1"
                onClick={this.onClickSearchButton}
              >
                <BsSearch />
              </button>
            </div>
          </div>
        </form>
      </nav>
    )
  }

  successViewFunction = () => {
    const {videosList} = this.state
    return (
      <>
        {videosList.length !== 0 ? (
          <ul className="mt-3 videos_container list-unstyled">
            {videosList.map(each => (
              <VideoItem key={each.id} eachVideo={each} />
            ))}
          </ul>
        ) : (
          <div className="mt-5 mb-5 d-flex flex-column justify-content-center align-items-center">
            <div className="w-50 text-center  mb-2">
              <img
                className="w-75"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                alt="no videos"
              />
            </div>
            <h2>No Search results found</h2>
            <p className="h5 text-secondary">
              Try different key words or remove search filter
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onClickRetryButton}
            >
              Retry
            </button>
          </div>
        )}
      </>
    )
  }

  onClickRetryButton = () => {
    this.setState({searchInput: ''}, this.getVideosList)
  }

  failureViewFunction = isDarkMode => (
    <div className="mt-5 mb-5 d-flex flex-column justify-content-center align-items-center">
      <div className="w-50 mb-2">
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
    <div className="flexGrow d-flex justify-content-center align-items-center">
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

  rightSideViewFunction = isDarkMode => {
    const {isShowBannerSection} = this.state
    return (
      <div className=" flexGrow d-flex flex-column overflow-auto">
        <div className="">{isShowBannerSection && this.bannerSection()}</div>
        <div className="mt-3">{this.searchFunction(isDarkMode)}</div>
        {this.switchFunction(isDarkMode)}
      </div>
    )
  }

  render() {
    const {searchInput} = this.state
    // console.log('videosList', videosList)
    console.log(searchInput)
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
                    data-testid="home"
                    className={
                      isDarkMode
                        ? 'col-10 overflow-auto trendingColor text-light'
                        : 'col-10 overflow-auto'
                    }
                  >
                    {this.rightSideViewFunction(isDarkMode)}
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

export default Home
