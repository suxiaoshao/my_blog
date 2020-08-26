import React from 'react';
import './style/app.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './view/home';
import { MyThemeProvider } from './components/common/theme';
import { Article } from './view/article';

export default function App(): JSX.Element {
  return (
    <>
      <Router>
        <MyThemeProvider>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/article/:aid">
              <Article />
            </Route>
            <Route path="/fail" />
          </Switch>
        </MyThemeProvider>
      </Router>
    </>
  );
}
