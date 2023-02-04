import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'

import ProtectedRoute from './components/ProtectedRoute'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import NxtWatchContext from './context'
import VideoItemDetails from './components/VideoItemDetails'

// Replace your code here
class App extends Component {
  state = {
    currentRoute: '',
    isLikedList: [],
    isDisLikedList: [],
    savedVideosList: [],
    isDarkMode: false,
  }

  setCurrentRoute = currentRoute => {
    this.setState({currentRoute})
  }

  clickingIsLike = id => {
    const {isLikedList, isDisLikedList} = this.state
    if (isLikedList.includes(id)) {
      this.setState({isLikedList})
    }
    if (!isLikedList.includes(id)) {
      this.setState(prevState => ({
        isLikedList: [...prevState.isLikedList, id],
      }))
    }
    if (isDisLikedList.includes(id)) {
      this.setState(prevState => ({
        isDisLikedList: prevState.isDisLikedList.filter(each => each !== id),
      }))
    }
  }

  clickingDisLike = id => {
    const {isLikedList, isDisLikedList} = this.state
    if (isDisLikedList.includes(id)) {
      this.setState({isDisLikedList})
    }
    if (!isDisLikedList.includes(id)) {
      this.setState(prevState => ({
        isDisLikedList: [...prevState.isDisLikedList, id],
      }))
    }
    if (isLikedList.includes(id)) {
      this.setState(prevState => ({
        isLikedList: prevState.isLikedList.filter(each => each !== id),
      }))
    }
  }

  setSavedVideosList = videoItem => {
    const {savedVideosList} = this.state
    // console.log(videoItem)
    const index = savedVideosList.findIndex(each => each.id === videoItem.id)
    // console.log('index', index)
    if (index === -1) {
      this.setState(prevState => ({
        savedVideosList: [...prevState.savedVideosList, videoItem],
      }))
    } else {
      this.setState(prevState => ({
        savedVideosList: prevState.savedVideosList.filter(
          each => each.id !== videoItem.id,
        ),
      }))
    }
  }

  setIsDarkMode = () => {
    this.setState(prevState => ({isDarkMode: !prevState.isDarkMode}))
  }

  render() {
    const {
      currentRoute,
      isLikedList,
      isDisLikedList,
      savedVideosList,
      isDarkMode,
    } = this.state
    // console.log('isLike', isLikedList)
    // console.log('isDisLike', isDisLikedList)
    // console.log('savedVideosList', savedVideosList)
    // console.log('isDarkMode', isDarkMode)
    return (
      <NxtWatchContext.Provider
        value={{
          currentRoute,
          isLikedList,
          isDisLikedList,
          savedVideosList,
          isDarkMode,
          setCurrentRoute: this.setCurrentRoute,
          clickingIsLike: this.clickingIsLike,
          clickingDisLike: this.clickingDisLike,
          setSavedVideosList: this.setSavedVideosList,
          setIsDarkMode: this.setIsDarkMode,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
