import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { useState } from 'react'
import Navbar from './components/NavBar'

/* Screens */
import Dashboard from './screens/Dashboard'
import Triggers from './screens/Triggers'
import Stats from './screens/Stats'

import Login from './screens/auth/Login'
import Register from './screens/auth/Register'
import Forgot from './screens/auth/Forgot'
import Reset from './screens/auth/Reset'

/*
    TODO
    + modularize auth header in component

    + cache components, and js?
    https://scotch.io/tutorials/how-to-optimize-node-requests-with-simple-caching-strategies

    + Serve resources from s3 bucket + cloudfront
    ~ Test; https://gtmetrix.com/
*/


const App = () => {
  /* Dynamic menu state - opened/closed */
  const [isNavOpen, setNavStatus] = useState(false)
  const syncNavStatus = (index) => setNavStatus(index)

  return (
    <div className='app'>

      <Router><Switch>

        {/* User authentication* */}
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />

        <Route exact path='/forgot' component={Forgot} />
        <Route exact path='/reset/:resetToken' component={Reset} />

        <>
          {/* Navbar */}
          <Navbar isOpen={isNavOpen} syncStatus={syncNavStatus} />

          {/* User util */}
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/triggers' component={Triggers} />
          <Route exact path='/stats' component={Stats} />

          {/* Wildcard - Catch all and redirect */}
          <Route path='/*' component={() => <Redirect to='/dashboard' />} />

        </>

      </Switch></Router>
    </div>
  )
}

export default App