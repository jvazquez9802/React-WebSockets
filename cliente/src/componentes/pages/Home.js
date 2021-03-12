import '../../assets/stylesheets/home.css'
import Button from '../utils/Button'
import { useState } from 'react'
import md5 from 'md5'
import { Link } from 'react-router-dom'


const Home = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const logIn = async () => {
        try {
            const response = await fetch('http://localhost:5000/signin', {
                method: 'POST',
                headers: {
                  'Content-type': 'application/json',
                  'Accept': 'application/json'
                },
                  body: JSON.stringify({
                      email:email,
                      password:md5(password),
                  }),
              })
  
              const jsonData = await response.json();
              console.log(jsonData)
        } catch (err) {
            console.log(err.message)
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
                        <a className="btn-form" onClick={() => logIn()}><strong>Iniciar Sesión</strong></a>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home
