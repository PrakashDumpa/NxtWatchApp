import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import './index.css'
import Header from '../Header'
import LeftSideBar from '../LeftSideBar'
import NxtWatchContext from '../../context'
import {HomeDiv} from '../Home/styledComponents'

const componentStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    status: componentStatus.initial,
    videoItemDetailsObj: {},
  }

  componentDidMount() {
    this.getVideoItemDetails()
  }

  fetchSuccessFunction = data => {
    const updatedVideoItemDetails = {
      channel: {
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
      },
      description: data.video_details.description,
      id: data.video_details.id,
      publishedAt: data.video_details.published_at,
      thumbnailUrl: data.video_details.thumbnail_url,
      title: data.video_details.title,
      viewCount: data.video_details.view_count,
      videoUrl: data.video_details.video_url,
    }
    // console.log(updatedVideoItemDetails)
    this.setState({
      videoItemDetailsObj: updatedVideoItemDetails,
      status: componentStatus.success,
    })
  }

  getVideoItemDetails = async () => {
    this.setState({status: componentStatus.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
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

  successViewFunction = (
    clickingIsLike,
    clickingDisLike,
    isLikedList,
    isDisLikedList,
    setSavedVideosList,
    savedVideosList,
    isDarkMode,
  ) => {
    const {videoItemDetailsObj} = this.state
    const {
      id,
      channel,
      publishedAt,
      // thumbnailUrl,
      title,
      viewCount,
      videoUrl,
      description,
    } = videoItemDetailsObj
    const {profileImageUrl, name, subscriberCount} = channel

    const onClickLikeButton = () => {
      clickingIsLike(id)
    }

    const onClickDisLikeButton = () => {
      clickingDisLike(id)
    }

    const onClickSaveButton = () => {
      setSavedVideosList(videoItemDetailsObj)
    }

    const addColorToLikeButton = isLikedList.includes(id)
      ? 'addColor'
      : 'removeColor'
    const addColorToDisLikeButton = isDisLikedList.includes(id)
      ? 'addColor'
      : 'removeColor'

    const index = savedVideosList.findIndex(each => each.id === id)
    const addColorToSaveButton =
      index !== -1 ? 'text-primary' : 'text-secondary'
    // console.log('addColorToLikeButton', addColorToLikeButton)
    return (
      <div
        className={
          isDarkMode
            ? 'mt-4 min-vh-100 mb-5 text-light'
            : 'mt-4 min-vh-100 mb-5'
        }
      >
        <div className="w-100">
          <ReactPlayer url={videoUrl} controls className="w-100" />
        </div>
        <p className="mt-3 m-0 mb-2">{title}</p>
        <div className="d-flex justify-content-between text-secondary">
          <div className="p-0 d-flex align-items-center ">
            <p className="m-0">{viewCount} views</p>
            <p className="ml-2 m-0">
              . {formatDistanceToNow(new Date(publishedAt))}
            </p>
          </div>
          <div className="d-flex">
            <button
              type="button"
              className={`d-flex align-items-center btn p-0 ${addColorToLikeButton}`}
              onClick={onClickLikeButton}
            >
              <BiLike className="h4 m-0" />
              <p className={`m-0 pl-1 ${addColorToLikeButton}`}>Like</p>
            </button>
            <button
              type="button"
              onClick={onClickDisLikeButton}
              className={`d-flex align-items-center btn p-0 ml-3 ${addColorToDisLikeButton}`}
            >
              <BiDislike className="h4 m-0" />
              <p className={`m-0 pl-1 ${addColorToDisLikeButton}`}>Dislike</p>
            </button>
            <button
              type="button"
              className={`d-flex align-items-center btn p-0 ml-3 ${addColorToSaveButton}`}
              onClick={onClickSaveButton}
            >
              <MdPlaylistAdd className="h4 m-0" />

              {index !== -1 ? (
                <p className="m-0 pl-1">Saved</p>
              ) : (
                <p className="m-0 pl-1">Save</p>
              )}
            </button>
          </div>
        </div>
        <div>
          <hr className="bg-secondary" />
        </div>
        <div className="mt-2">
          <div className="d-flex">
            <div className="text-center">
              <img src={profileImageUrl} alt="channel logo" className="w-50" />
            </div>
            <div>
              <p className="m-0">{name}</p>
              <p className="text-secondary">{subscriberCount} subscribers</p>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  onClickRetryButton = () => {
    this.getVideoItemDetails()
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
        We are having some trouble to complete your request. Please try again.
      </p>
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
    <div className="flexGrow d-flex justify-content-center align-items-center vh-100">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="blue" height="50" width="50" />
      </div>
    </div>
  )

  switchFunction = (
    clickingIsLike,
    clickingDisLike,
    isLikedList,
    isDisLikedList,
    setSavedVideosList,
    savedVideosList,
    isDarkMode,
  ) => {
    const {status} = this.state

    switch (status) {
      case componentStatus.success:
        return this.successViewFunction(
          clickingIsLike,
          clickingDisLike,
          isLikedList,
          isDisLikedList,
          setSavedVideosList,
          savedVideosList,
          isDarkMode,
        )
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
          const {
            clickingIsLike,
            clickingDisLike,
            isLikedList,
            isDisLikedList,
            setSavedVideosList,
            savedVideosList,
            isDarkMode,
          } = value
          return (
            <div className="bg_container">
              <div className="main_container ">
                <Header />
                <div className="d-flex vh-100">
                  <LeftSideBar />
                  <HomeDiv
                    home={isDarkMode}
                    data-testid="videoItemDetails"
                    className={
                      isDarkMode
                        ? 'col-10 overflow-auto trendingColor'
                        : 'col-10 overflow-auto'
                    }
                  >
                    {this.switchFunction(
                      clickingIsLike,
                      clickingDisLike,
                      isLikedList,
                      isDisLikedList,
                      setSavedVideosList,
                      savedVideosList,
                      isDarkMode,
                    )}
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

export default withRouter(VideoItemDetails)
