import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Routing
import PrivateRoute from './components/routing/PrivateRoute'

// Screens
import Dashboard from './screens/Dashboard'
import Login from './screens/Login'
import Register from './screens/Register'
import Forgot from './screens/Forgot'
import Reset from './screens/Reset'

const App = () => {
  return (
    <Router>
      <div className='app'>

        <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          
          <Route exact path='/forgot' component={Forgot} />
          <Route exact path='/reset/:resetToken' component={Reset} />
        </Switch>

      </div>
    </Router>
  )
}

export default App