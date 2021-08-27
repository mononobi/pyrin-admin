import React, { Component }  from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { CONFIGS } from './core/configs';
import { ROUTES } from './routing/routes';


export class App extends Component {

  state = {
    authenticated: true
  }

  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route key={-1} exact path='/'>
              <Redirect to={CONFIGS.panel_home_path} />
            </Route>
            {ROUTES.map((route, index) => (
                <Route key={index} exact={route.exact} path={route.path} component={route.component}/>
            ))}
          </Switch>
        </BrowserRouter>
    )
  }
}
