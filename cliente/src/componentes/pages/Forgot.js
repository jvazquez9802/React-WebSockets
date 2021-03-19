import '../../assets/stylesheets/resetPassword.css'
import React, { useState } from 'react'


const Forgot = () => {

    const [email, setEmail] = useState('')
    return (
        <div className="container">
                <div className="reset-box">
                    <h1 className="reset-box-header">Recupera tu contraseña</h1>
                    <form className="reset-form">
                        <input 
                            className="data-res"
                            type="text"
                            placeholder="Correo Electrónico"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <a className="btn-form-res" onClick={() => {console.log('reset pass')}}><strong>Recuperar</strong></a>
                    </form>
                </div>
            </div>
    )
}

export default Forgot
