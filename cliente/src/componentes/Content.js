import '../assets/stylesheets/content.css'

import PropTypes from 'prop-types';
import Sidebar from './sidebar/Bar'
import { useLocation } from 'react-router-dom'

const Content = ({body}) => {

    const location = useLocation()
    return (
        <div className="graph-content">
            {location.pathname !=="/" && location.pathname !== "/registro" &&(
                <Sidebar />
            )}
            <div className="box-content">
                {body}
            </div>
        </div>
    )
}

Content.propTypes = {
    body: PropTypes.object.isRequired
}

export default Content;