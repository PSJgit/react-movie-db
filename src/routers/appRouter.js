import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom'
import App from '../components/app'
import CheckBrowser from '../components/checkBrowser.js'
import Route404 from '../components/route404'

const AppRouter = (props) => {
  return (
    <BrowserRouter>
      <Fragment>
        <CheckBrowser isSupported={props.isSupported}/>
        <Switch>
          <Route path='/' component={App} exact={true} />
          <Route component={Route404} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  )
}

export default AppRouter;


/* passing props
<Route
  path='/dashboard'
  render={(props) => <Dashboard {...props} isAuthed={true} />}
/>*/