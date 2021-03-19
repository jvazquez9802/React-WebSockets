import '../../assets/stylesheets/resetPassword.css'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../AuthContext'


const Forgot = () => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const history = useHistory()
    const { resetPassword } = useAuth()

    const handleResetPassword = async () =>{
        try {
            setError('')
            setLoading(true)
            await resetPassword(email)
            alert('Se ha enviado un correo de recuperación')
            history.push('/')

        } catch {
            setError('Algo salió mal, prueba de nuevo')
        }
        setLoading(false)
    }

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
                        {!loading &&
                            <a className="btn-form-res" onClick={handleResetPassword}><strong>Recuperar</strong></a>
                        }
                        <Link className='forgot-to-signIn' to='/'>Iniciar sesión</Link>
                    </form>
                </div>
            </div>
    )
}

export default Forgot
