import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DashBoard from './dashboard/Dash'
import { useLocation } from 'react-router-dom'

const Content = ({body}) => {

    const location = useLocation()
    return (
        <div >
                {location.pathname !=="/" &&(<div className="box-dash"><DashBoard /></div>)}
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