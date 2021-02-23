import '../assets/stylesheets/app.css'

import React, { Component, Fragment } from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import PropTypes from 'prop-types'

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    const {children} = this.props;
    return (
      <Fragment>
          <div className="main-content">
            <div className="header-content">
              <Header />
            </div>
            <div className="body-content">
              <Content body = {children} />
            </div>
            <div className="footer-content">
              <Footer />
            </div>
          </div>
      </Fragment>
    );
  }
}

export default App;