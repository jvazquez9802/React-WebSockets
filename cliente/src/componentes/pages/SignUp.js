import '../../assets/stylesheets/signup.css'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../AuthContext'

const SignUp = () => {

    const history = useHistory()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const { signup } = useAuth()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSignUp = async () => {
        if(password === confirm){
            if(password.length < 6){
                alert('La constraseña debe tener 6 o más caracteres')
            } else {
                try {
                    setError('')
                    setLoading(true)
                    await signup(email, password)
                    history.push('/')
                } catch (err) {
                    setError('Error al iniciar sesión')
                }
                setLoading(false)
            }
            
        } else {
            alert('Las contraseñas no coinciden')
        }
    }

    return (
        <div className="SignUp-content">
            <div className="SignUp-box">
                <h1 className="SignUp-title">Forma parte del STCC</h1>
                {error && alert(error)}
                <form className="SignUp-form"> 
                <input 
                    className="in-mail"
                    type="mail"
                    placeholder="Correo"
                    autoComplete ="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    className="in-password"
                    type="password"
                    placeholder="Contraseña"
                    autoComplete ="off"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input 
                    className="in-confirm-password"
                    type="password"
                    placeholder="Confirmar Contraseña"
                    autoComplete ="off"
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                />
                <a disabled={loading} onClick={() => {handleSignUp()}} className="btn-form-signup"><strong>Regístrate</strong></a>
                </form>
            </div>
        </div>
    )
}
export default SignUp
