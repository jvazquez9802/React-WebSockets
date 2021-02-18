  
import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import page404 from './componentes/error/Page404'
import App from './componentes/App'
import home from './componentes/home/Home'
import list from './componentes/ListRegistry'
import chat from './componentes/Chat'

class AppRoutes extends Component{
    render() {
        return(
            <App>
                <Switch>
                    <Route exact path = '/' component = {home} />
                    <Route exact path = '/lista' component = {list} />
                    <Route exact path = '/chat' component = {chat} />
                    <Route component = {page404} />
                </Switch>
            </App>
        );
    }
}

export default AppRoutes;