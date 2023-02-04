import styled from 'styled-components'

export const Banner = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
`
export const HomeDiv = styled.div`
  background-color: ${props => (props.home ? '#181818' : null)};
`
