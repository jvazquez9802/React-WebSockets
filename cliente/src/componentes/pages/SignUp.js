import '../../assets/stylesheets/signup.css'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../AuthContext'

const SignUp = () => {

    const history = useHistory()
    
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [curp, setCurp] = useState('')
    const [rfc, setRfc] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [phone, setPhone] = useState('')

    const { signup } = useAuth()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const register = async () => {
            if(password === confirm){
                if(password.length < 6){
                    alert('La constraseña debe tener 6 o más caracteres')
                } else {
                    const response = await fetch('http://localhost:5000/signup', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json'
                    },
                        body: JSON.stringify({
                            username:user,
                            fullName:name,
                            email:email,
                            curp:curp.toUpperCase(),
                            rfc:rfc.toUpperCase(),
                            password:password,
                            phone:phone
                        }),
                    })
                    
                    const res = await response.json();
                    if(res && res.success){
                        try {
                            setError('')
                            setLoading(true)
                            console.log(res)
                            await signup(email, password)
                            history.push('/')
                        } catch (err) {
                            setError('Error al iniciar sesión')
                        }
                        setLoading(false)
                    }
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
                    className="in-user"
                    type="text"
                    placeholder="Usuario"
                    autoComplete ="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                />
                <input 
                    className="in-mail"
                    type="mail"
                    placeholder="Correo"
                    autoComplete ="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    className="in-name"
                    type="text"
                    placeholder="Nombre"
                    autoComplete ="off"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input 
                    className="in-curp"
                    type="text"
                    placeholder="CURP"
                    autoComplete ="off"
                    onChange={(e) => setCurp(e.target.value)}
                    required
                />
                <input 
                    className="in-rfc"
                    type="text"
                    placeholder="RFC"
                    autoComplete ="off"
                    onChange={(e) => setRfc(e.target.value)}
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
                <input 
                    className="in-phone"
                    type="text"
                    placeholder="Teléfono"
                    autoComplete ="off"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <a disabled={loading} onClick={() => {register()}} className="btn-form"><strong>Regístrate</strong></a>
                </form>
            </div>
        </div>
    )
}
export default SignUp
