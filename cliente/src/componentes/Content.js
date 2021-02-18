import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DashBoard from './dashboard/Dash'

class Content extends Component {
  
    static propTypes = {
    body: PropTypes.object.isRequired
    };

    render() {
        const { body } = this.props;
        return (
            <div className="container is-fullhd" style={{height:"100%"}}>
                <div className="box-dash">
                    <DashBoard />
                </div>
                <div className="box-content">
                    {body}
                </div>
            </div>
        );
    }
}

export default Content;