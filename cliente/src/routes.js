  
import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import page404 from './componentes/error/Page404'
import App from './componentes/App'
import Home from './componentes/pages/Home'
import SignUp from './componentes/pages/SignUp'
import list from './componentes/ListRegistry'
import chat from './componentes/Chat'
import Temperatura from './componentes/Graphs/Temperature'

class AppRoutes extends Component{
    render() {
        return(
            <App>
                <Switch>
                    <Route exact path = '/' component = {Home} />
                    <Route exact path = '/registro' component = {SignUp} />
                    <Route exact path = '/lista' component = {list} />
                    <Route exact path = '/temperatura' component = {Temperatura} />
                    <Route exact path = '/chat' component = {chat} />
                    <Route component = {page404} />
                </Switch>
            </App>
        );
    }
}

export default AppRoutes;