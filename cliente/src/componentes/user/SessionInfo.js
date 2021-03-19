import '../../assets/stylesheets/profile.css'
import { useState, useEffect } from 'react'
import { useAuth } from '../../AuthContext'
import { useHistory } from 'react-router-dom'

const SessionInfo = () => {

    const history = useHistory()
    const { currentUser, updateEmail, updatePassword } = useAuth()
    
    const [email, setEmail] = useState(currentUser.email)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [edit, setEdit] = useState(false)

    const handleUpdateInfo = () => {
        setLoading(true)
        setError('')
        if(password !== confirmPassword){
            setLoading(false)
            setError('Las contraseñas no coinciden')
            alert(error)
            return 
        }
        if(password !== '' && password.length < 6){
            setLoading(false)
            setError('La contraseña debe tener al menos 6 caracteres')
            alert(error)
            return 
        }

        const promises = []
        if(email !== currentUser.email){
            promises.push(updateEmail(email))
        }
        if(password){
            promises.push(updatePassword(password))
        }

        Promise.all(promises).then(() => {
            alert('Datos actualizados')
            history.push('/info')
        }).catch(() => {
            setError('Fallo al actualizar')
        }).finally(() => {
            setLoading(false)
        })
    }
    return (        
        <div className="profile-box-session">
            <h1 className="profile-title">información de la cuenta</h1>
            <form className="profile-form">

                {edit &&
                    <>
                        <input 
                            className="in-name"
                            type="email"
                            placeholder={'Email: ' + email}
                            value={email}
                            autoComplete ="off"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input 
                            className="in-curp"
                            type="password"
                            placeholder={password === '' ? 'Deja en blanco para conservar la contraseña actual' : password}
                            autoComplete ="off"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input 
                            className="in-rfc"
                            type="password"
                            placeholder={confirmPassword === '' ? 'Deja en blanco para conservar la contraseña actual' : confirmPassword}
                            autoComplete ="off"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {!loading &&
                            <>
                                <a onClick={() => {setEdit(!edit)}} className="btn-cancel-edit"><strong>Cancelar</strong></a>
                                <a onClick={() => {handleUpdateInfo()}} className="btn-form-profile"><strong>Actualizar</strong></a>
                            </>
                        }
                    </>

                }
                {!edit &&
                    <>
                        <p className="in-name">{'Correo electrónico: ' + email}</p>
                        <p className="in-curp">Contraseña: ******************</p>
                        <a onClick={() => {setEdit(!edit)}} className="btn-form-profile"><strong>Editar</strong></a>
                    </>
                }
            </form>
        </div>
    )
}

export default SessionInfo

