import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Routing
import PrivateRoute from './components/routing/PrivateRoute'

// Screens
import PrivateScreen from './screens/PrivateScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ForgotScreen from './screens/ForgotScreen'
import ResetScreen from './screens/ResetScreen'

const App = () => {
  return (
    <Router>
      <div className='app'>

        <Switch>
          <PrivateRoute exact path='/' component={PrivateScreen} />
          
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/register' component={RegisterScreen} />
          <Route exact path='/forgot' component={ForgotScreen} />
          <Route exact path='/reset/:resetToken' component={ResetScreen} />
        </Switch>

      </div>
    </Router>
  )
}

export default App