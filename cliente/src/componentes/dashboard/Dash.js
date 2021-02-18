import logo from '../../assets/logoCTC.png'
import { Link } from 'react-router-dom'
const Dash = () => {
    return (
            <div className="page-wrapper chiller-theme toggled">
                <a id="show-sidebar" className="btn btn-sm btn-dark" href="#">
                    <i className="fas fa-bars"></i>
                </a>
                <div id="sidebar" className="sidebar-wrapper">
                    <div className="sidebar-content">
                        <div className="navbar-brand">
                            <Link className="logo-container" to="/">
                                    <img src={logo} width="70" height="70" alt="CTC Logo"/>
                            </Link>
                            <Link class="navbar-item" to="/"><p className="navbar-title">CTC</p></Link>
                        </div>
                        <div className="sidebar-menu">
                            <ul>
                                <li className="header-menu">
                                    <span>Extra</span>
                                </li>
                                <li>
                                    <a href="#"><span>Documentation</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Dash
