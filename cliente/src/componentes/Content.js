import '../assets/stylesheets/content.css'

import PropTypes from 'prop-types';
import Sidebar from './sidebar/Bar'
import { useLocation } from 'react-router-dom'

const Content = ({children}) => {

    const location = useLocation()
    return (
        <div className="graph-content">
            {location.pathname !=="/" && location.pathname !== "/registro" &&  location.pathname !== "/recuperar" &&(
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