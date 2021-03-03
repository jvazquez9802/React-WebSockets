import '../assets/stylesheets/header.css'

import Button from './utils/Button'
import logo from '../assets/images/logoCTC.png'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
           <nav className="navbar" role="navigation" aria-label="main navigation" style={{backgroundColor:"#ADC98B"}}>
                <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-brand">
                            <Link className="logo-container" to="/">
                                    <img src={logo} width="70" height="70" alt="CTC Logo"/>
                            </Link>
                            <Link className="navbar-item" to="/"><p className="navbar-title">STCC</p></Link>
                        </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                               <Button url="/" text="Cerrar Sesión"/>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
    )
}

export default Header
