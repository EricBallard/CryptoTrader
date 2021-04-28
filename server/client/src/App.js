import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

/* Routing * */
import UserRoute from './components/UserRoute'

/* Screen */
import Dashboard from './screens/Dashboard'
import Triggers from './screens/Triggers'
import Stats from './screens/Stats'

import Login from './screens/auth/Login'
import Register from './screens/auth/Register'
import Forgot from './screens/auth/Forgot'
import Reset from './screens/auth/Reset'


const App = () => {
  return (
    <Router>
        <Switch>
          
        {/* Wildcard route to require auth*/}
        <UserRoute exact path='/' component={Dashboard} />
          
          {/* User authentication* */}
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          
          <Route exact path='/forgot' component={Forgot} />
          <Route exact path='/reset/:resetToken' component={Reset} />

          {/* User util */}
          <Route exact path='/triggers' component={Triggers} />
          <Route exact path='/stats' component={Stats} />

          {/* Catch un-supported paths and redirect */}
          <Route path='/*' component={Dashboard} />

        </Switch>
    </Router>
  )
}

export default App