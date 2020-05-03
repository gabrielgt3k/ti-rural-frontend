import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Home from '../pages/Home';
import LinhasOi from '../pages/LinhasOi';
import Login from '../pages/Login';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Nav>
          <Route path="/home" component={Home} isPrivate />
          <Route path="/linhas" component={LinhasOi} isPrivate />
          <Footer />
        </Nav>
      </Switch>
    </>
  );
}
