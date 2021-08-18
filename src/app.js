import React, { Component }  from 'react';
import { HomeComponent } from './components/home';


export class App extends Component {

  state = {
    authenticated: true
  }

  render() {
    return (
        <HomeComponent />
    )
  }
}
