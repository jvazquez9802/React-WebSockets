import '../assets/stylesheets/app.css'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import page404 from '../componentes/error/Page404'
import Home from '../componentes/pages/Home'
import SignUp from '../componentes/pages/SignUp'
import list from '../componentes/ListRegistry'
import Container from '../componentes/Graphs/Container'
import Forgot from '../componentes/pages/Forgot'
import { AuthProvider } from '../AuthContext'

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
                    <Route exact path = '/' component = {Home} />
                    <Route exact path = '/registro' component = {SignUp} />
                    <Route exact path = '/recuperar' component = {Forgot} />
                    <Route exact path = '/lista' component = {list} />
                    <Route exact path = '/info' component = {Container} />
                    <Route exact path = '/info/temperatura' component = {Container} />
                    <Route exact path = '/info/humedad' component = {Container} />
                    <Route exact path = '/info/viento' component = {Container} />
                    <Route exact path = '/info/presion' component = {Container} />
                    <Route exact path = '/info/radiacion' component = {Container} />
                    <Route exact path = '/info/precipitacion' component = {Container} />
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