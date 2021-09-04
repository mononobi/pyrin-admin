import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './report_web_vitals';
import { ThemeProvider } from '@material-ui/core/styles';
import { App } from './app';
import { THEME } from "./core/theme";


ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={THEME}>
          <App />
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
