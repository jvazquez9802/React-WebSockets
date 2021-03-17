import '../assets/stylesheets/header.css'
import logo from '../assets/images/logoCTC.png'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const Header = () => {

    let history = useHistory()

    const logOut = () => {
        console.log('Sesión cerrada')
        history.push('/')
    }
    
    return (
           <nav className="navbar" role="navigation" aria-label="main navigation" style={{backgroundColor:"#ADC98B"}}>
                <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-brand">
                            <Link className="logo-container" to="/">
                                    <img src={logo} width="70" height="70" alt="CTC Logo" href='/'/>
                            </Link>
                            <Link className="navbar-item" to="/"><p className="navbar-title">STCC</p></Link>
                        </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                               <button className="button is-light" onClick={()=>{logOut()}}>Cerrar sesión</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
    )
}

export default Header
