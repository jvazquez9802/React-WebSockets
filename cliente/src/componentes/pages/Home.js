import '../../assets/stylesheets/home.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../AuthContext'

const Home = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const { sigin } = useAuth()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    
    let history = useHistory()
    
    const logIn = async () => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                  'Content-type': 'application/json',
                  'Accept': 'application/json'
                },
                  body: JSON.stringify({
                      email:email,
                      password:password
                  }),
              })
              const res = await response.json();
              console.log(res)
              if(res && res.found){
                try {
                    setError('')
                    setLoading(true)
                    await sigin(email, password)
                    history.push('/info')
                } catch {
                    setError('Fallo al iniciar sesion')
                    console.log(error)
                }
            } else {
                alert('Fallo al iniciar sesión')
            }

        } catch {
            setError('Fallo al iniciar sesion')
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
                        
                        <a disable={loading} className="btn-form" onClick={() => logIn()}><strong>Iniciar Sesión</strong></a>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home
