import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'
import NxtWatchContext from '../../context'

const ProtectedRoute = props => (
  <NxtWatchContext.Consumer>
    {value => {
      const {currentRoute, setCurrentRoute} = value

      const jwtToken = Cookies.get('jwt_token')
      if (jwtToken === undefined) {
        return <Redirect to="/login" />
      }
      const {path} = props
      if (currentRoute !== path) {
        setCurrentRoute(path)
      }

      return <Route {...props} />
    }}
  </NxtWatchContext.Consumer>
)

export default ProtectedRoute
