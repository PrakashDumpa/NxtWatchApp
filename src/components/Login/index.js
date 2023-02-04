import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'
import NxtWatchContext from '../../context'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', isChecked: false}

  onChangeInputFunction = event => {
    const obj = this.state
    this.setState({...obj, [event.target.name]: event.target.value})
  }

  loginSuccessFunction = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  loginFailureFunction = errorMsg => {
    this.setState({errorMsg})
  }

  onClickLoginButton = async event => {
    const {username, password} = this.state
    event.preventDefault()
    // console.log('login')
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    // console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      //   console.log(data)
      this.loginSuccessFunction(data.jwt_token)
    } else {
      //   console.log(data)
      this.loginFailureFunction(data.error_msg)
    }
  }

  onShowPasswordFunction = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  render() {
    const {username, password, errorMsg, isChecked} = this.state
    // console.log('username', username)
    // console.log('password', password)
    const toggleType = isChecked ? 'text' : 'password'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      //   console.log('redirect')
      return <Redirect to="/" />
    }

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkMode} = value
          return (
            <div
              className={
                isDarkMode
                  ? 'd-flex  bg-dark justify-content-center align-items-center vh-100'
                  : 'd-flex justify-content-center align-items-center vh-100'
              }
            >
              <form
                className={
                  isDarkMode
                    ? 'col-4 shadow-lg pt-5 pr-5 pl-5 pb-3 text-light trendingColor form_Container'
                    : 'col-4 shadow-lg pt-5 pr-5 pl-5 pb-3 text-secondary form_Container'
                }
                onSubmit={this.onClickLoginButton}
              >
                <div className="text-center mb-5">
                  <img
                    className="w-50"
                    src={
                      isDarkMode
                        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                    }
                    alt="website logo"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">USERNAME</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Username"
                    value={username}
                    name="username"
                    onChange={this.onChangeInputFunction}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">PASSWORD</label>
                  <input
                    type={toggleType}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    value={password}
                    name="password"
                    onChange={this.onChangeInputFunction}
                  />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    onChange={this.onShowPasswordFunction}
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Show Password
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mt-3 loginButtonColor"
                >
                  Login
                </button>
                <p className="text-danger mt-2">{errorMsg}</p>
              </form>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Login
