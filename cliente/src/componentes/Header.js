import React from 'react'
import Button from './utils/Button'

const Header = () => {
    return (
           <nav className="navbar" role="navigation" aria-label="main navigation">
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                               <Button text="Cerrar Sesión"/>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
    )
}

export default Header
