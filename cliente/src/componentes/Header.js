import '../assets/stylesheets/header.css'
import logo from '../assets/images/logoCTC.png'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { useState } from 'react'

const Header = () => {

    
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    const handleLogOut = async () => {
        setError('')
        try {
            await logout()
            history.push('/')
        } catch {
            setError('Fallo al cerrar sesion')
            alert(error)
        }
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
                                {currentUser &&
                                    <a className="button is-light" onClick={ () => handleLogOut()}>Cerrar sesión</a>
                                } 
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
    )
}

export default Header
