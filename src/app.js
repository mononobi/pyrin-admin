import React, { Component }  from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { CONFIGS } from './configs';
import { HomeComponent } from './components/home';
import { ListComponent } from './components/list';
import { AddComponent } from './components/add';
import { EditComponent } from './components/edit';
import { LoginComponent } from './components/login';
import { NotFoundComponent } from './components/not_found';


const routes = [
  {
    path: CONFIGS.panel_home_path,
    component: HomeComponent,
    exact: true
  },
  {
    path: CONFIGS.panel_home_path + '/login',
    component: LoginComponent,
    exact: true
  },
  {
    path: CONFIGS.panel_home_path + '/:register_name',
    component: ListComponent,
    exact: true
  },
  {
    path: CONFIGS.panel_home_path + '/:register_name/add',
    component: AddComponent,
    exact: true
  },
  {
    path: CONFIGS.panel_home_path + '/:register_name/:pk',
    component: EditComponent,
    exact: true
  },
  {
    path: '*',
    component: NotFoundComponent,
    exact: false
  }
];


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
            {routes.map((route, index) => (
                <Route key={index} exact={route.exact} path={route.path} component={route.component}/>
            ))}
          </Switch>
        </BrowserRouter>
    )
  }
}
