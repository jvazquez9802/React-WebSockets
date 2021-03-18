import '../../assets/stylesheets/home.css'
import React from 'react'
import { useState, useEffect } from 'react'

const Forgot = () => {

    const [email, setEmail] = useState([])

    const resetPassword = () => {
        console.log("Restablecer pass")
    }

    return (
        <div className="home-box">
                <div className="signin-box">
                    <h1 className="signin-box-header">Recupera tu contraseña</h1>
                    <form className="home-form">
                        <input 
                            className="data-in1"
                            type="text"
                            placeholder="Correo Electrónico"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <a className="btn-form" onClick={() => resetPassword()}><strong>Recuperar</strong></a>
                    </form>
                </div>
            </div>
    )
}

export default Forgot
