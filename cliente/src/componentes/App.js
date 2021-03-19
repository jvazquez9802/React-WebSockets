import '../assets/stylesheets/app.css'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import page404 from '../componentes/error/Page404'
import Home from '../componentes/pages/Home'
import SignUp from '../componentes/pages/SignUp'
import Container from '../componentes/Graphs/Container'
import Forgot from '../componentes/pages/Forgot'
import Profile from '../componentes/user/profile'

import { AuthProvider } from '../AuthContext'
import {PrivateRouteNotCurrent as RouteN, PrivateRouteCurrent as RouteY } from '../PrivateRoute'

const App = () => {
    return (
      <Router>
        <AuthProvider>
            <div className="main-content">
              <div className="header-content">
                <Header />
              </div>
              <div className="body-content">
                <Content>
                  <Switch>
                    <RouteY exact path = '/' component = {Home} />
                    <RouteY exact path = '/registro' component = {SignUp} />
                    <RouteY exact path = '/recuperar' component = {Forgot} />
                    <RouteN exact path = '/perfil' component = {Profile} />
                    <RouteN exact path = '/info' component = {Container} />
                    <RouteN exact path = '/info/temperatura' component = {Container} />
                    <RouteN exact path = '/info/humedad' component = {Container} />
                    <RouteN exact path = '/info/viento' component = {Container} />
                    <RouteN exact path = '/info/presion' component = {Container} />
                    <RouteN exact path = '/info/radiacion' component = {Container} />
                    <RouteN exact path = '/info/precipitacion' component = {Container} />
                    <Route component = {page404} />
                  </Switch>
                </Content>
              </div>
              <div className="footer-content">
                <Footer />
              </div>
            </div>
        </AuthProvider>
      </Router>
    );
  
}

export default App;