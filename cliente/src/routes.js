import { Route, Switch } from 'react-router-dom';
import page404 from './componentes/error/Page404'
import App from './componentes/App'
import Home from './componentes/pages/Home'
import SignUp from './componentes/pages/SignUp'
import list from './componentes/ListRegistry'
import Container from './componentes/Graphs/Container';

const AppRoutes = () => {

    return(
        <App>
            <Switch>
                <Route exact path = '/' component = {Home} />
                <Route exact path = '/registro' component = {SignUp} />
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
        </App>
    );
}

export default AppRoutes;