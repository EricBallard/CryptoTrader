import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { useState } from 'react'
import NavBar from './components/nav-bar'

/* Screens */
import Dashboard from './screens/dashboard'
import Triggers from './screens/triggers'
import Stats from './screens/stats'

import Login from './screens/auth/login'
import Register from './screens/auth/register'
import Forgot from './screens/auth/forgot'
import Reset from './screens/auth/reset'


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

  /* Window properities - init max height */
  const [maxHeight, setMaxHeight] = useState(window.maxHeight | window.innerHeight | window.screen.maxHeight)

  return (
    <div className='app'>

      {/*  */}
      {/* React v5 router */}
      <Router><Switch>

        {/* User authentication* */}
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />

        <Route exact path='/forgot' component={Forgot} />
        <Route exact path='/reset/:resetToken' component={Reset} />

        <>
          {/* Navbar */}
          <NavBar {...{ isNavOpen, setNavStatus, setMaxHeight }} />

          {/* User util */}
          <Route exact path='/dashboard'
            render={(props) => <Dashboard {...props} isMenuOpen={isNavOpen} height={maxHeight} />} />

          <Route exact path='/triggers'
            render={(props) => <Triggers {...props} isMenuOpen={isNavOpen} />} />

          <Route exact path='/stats'
            render={(props) => <Stats {...props} isMenuOpen={isNavOpen} />} />


          {/* No match  */}
          <Redirect to='/dashboard' />
        </>

      </Switch></Router>
    </div>
  )
}

export default App