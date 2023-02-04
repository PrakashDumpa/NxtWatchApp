import React from 'react'

const NxtWatchContext = React.createContext({
  currentRoute: '',
  setCurrentRoute: () => {},
  isLikedList: [],
  clickingIsLike: () => {},
  isDisLikedList: [],
  clickingDisLike: () => {},
  savedVideosList: [],
  setSavedVideosList: () => {},
  isDarkMode: false,
  setIsDarkMode: () => {},
})

export default NxtWatchContext
