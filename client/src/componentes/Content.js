import '../assets/stylesheets/content.css'

import PropTypes from 'prop-types';
import Sidebar from './sidebar/Bar'
import { useLocation } from 'react-router-dom'

const Content = ({children}) => {

    const lc = useLocation()
    return (
        <div className="graph-content">
            {lc.pathname !=="/" && lc.pathname !== "/registro" &&  lc.pathname !== "/recuperar" && lc.pathname !== "/perfil" &&(
                <Sidebar />
            )}
                {children}
        </div>
    )
}
Content.propTypes = {
    children: PropTypes.object.isRequired
}

export default Content;