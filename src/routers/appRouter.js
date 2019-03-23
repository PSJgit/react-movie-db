import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom'

import CheckBrowser from '../components/checkBrowser.js'
import App from '../components/app.js'
import Route404 from '../components/route404.js'
import FilmDetail from '../components/filmDetail.js'


const AppRouter = (props) => {
  return (
    <BrowserRouter>
      <Fragment>
        <CheckBrowser isSupported={props.isSupported}/>
        <Switch>
          <Route path='/' component={App} exact={true} />
          
          <Route
            path='/filmDetail:id'
            render={(props) => <FilmDetail {...props} 
              pageData={sessionStorage.getItem('pageData')}
              pageConfig={sessionStorage.getItem('pageConfig')} 
            />}
          />

          <Route component={Route404} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  )
}

export default AppRouter;
