import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { CONFIGS, loadConfigs } from './core/configs';
import { ROUTES } from './routing/routes';
import { BaseComponent } from './components/base/base/base';


export class App extends BaseComponent {

  state = {
      authenticated: true
  }

  _componentDidMount() {
      loadConfigs();
  }

  _render() {
      return (
            <BrowserRouter>
                <Switch>
                    <Route key='-1' exact path='/'>
                        <Redirect to={CONFIGS.panel_home_path}/>
                    </Route>
                    {ROUTES.map((route, index) => (
                        <Route key={index.toString()} exact={route.exact} path={route.path}
                               component={route.component}/>
                    ))}
                </Switch>
            </BrowserRouter>
        )
    }
}
