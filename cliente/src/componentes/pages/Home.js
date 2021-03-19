import '../../assets/stylesheets/home.css'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../AuthContext'

const Home = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const { sigin, currentUser } = useAuth()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    
    let history = useHistory()
    
    const handleLogIn = async () => {
        try {
            setError('')
            setLoading(true)
            await sigin(email, password)
            history.push('/info')
        } catch {
            setError('Fallo al iniciar sesion')
            console.log(error)
        }
    }

    return (
        <div className="home-container">
            <div className="home-text">
                <h1 className="home-header">Bienvenido</h1>
                <p className="home-p1">Regístrate al STCC</p>
                
                <p className="home-p2">Registrándote podrás visualizar las condiciones climatológicas de tu cultivo en tiempo real y recibirás notificaciones en caso de un posible riesgo. </p>
                <Link className="btn-home-up" to="/registro">Regístrate</Link>
            </div>
            <div className="home-box">
                <div className="signin-box">
                    <h1 className="signin-box-header">O inicia sesión con tu cuenta</h1>
                    <form className="home-form">
                        <input 
                            className="data-in1"
                            type="text"
                            placeholder="Usuario"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input 
                            className="data-in2" 
                            type="password"
                            placeholder="Contraseña"
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        
                        <a disable={loading} className="btn-form" onClick={() => handleLogIn()}><strong>Iniciar Sesión</strong></a>
                    </form>
                    <Link className="forgot-pass" to="/recuperar">¿Olvidaste tu contraseña?</Link>
                </div>
            </div>
        </div>
    )
}

export default Home
