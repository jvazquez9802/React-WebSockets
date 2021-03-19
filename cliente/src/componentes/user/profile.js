import '../../assets/stylesheets/profile.css'
import { useState, useEffect } from 'react'
import { useAuth } from '../../AuthContext'

const Profile = () => {

    const { currentUser } = useAuth()
    
    const [name, setName] = useState('')
    const [curp, setCurp] = useState('')
    const [rfc, setRfc] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState(currentUser.email)

    const saveData = async () => {
        const response = await fetch(`http://localhost:5000/user/${currentUser.uid}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
            body: JSON.stringify({
                name: name,
                email: email,
                curp: curp.toUpperCase(),
                rfc: rfc.toUpperCase(),
                phone: phone
            }),
        })
        
        const res = await response.json();
        res.success ? alert('Actualización exitosa') : alert('Fallo al actualizar los datos')
    }

    const getData = async () => {
        const response = await fetch(`http://localhost:5000/user/${currentUser.uid}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }})
        
        const res = await response.json();

        console.log(res)
        if(res.found){
            setName(res.user.username)
            setCurp(res.user.curp)
            setRfc(res.user.rfc)
            setPhone(res.user.phone)
        }       
    }

    useEffect(() => {
        getData()
    })

    return (
        <div className="profile-content">
            <div className="profile-box">
                <h1 className="profile-title">información de usuario</h1>
                <form className="profile-form">
                <input 
                    className="in-name"
                    type="text"
                    placeholder={name === '' ? 'Agrega tu nombre' : name}
                    autoComplete ="off"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input 
                    className="in-curp"
                    type="text"
                    placeholder={curp === '' ? 'Agrega tu CURP' : curp}
                    autoComplete ="off"
                    onChange={(e) => setCurp(e.target.value)}
                    required
                />
                <input 
                    className="in-rfc"
                    type="text"
                    placeholder={rfc === '' ? 'Agrega tu RFC' : rfc}
                    autoComplete ="off"
                    onChange={(e) => setRfc(e.target.value)}
                    required
                />
                <input 
                    className="in-phone"
                    type="text"
                    placeholder={phone === '' ? 'Agrega tu número telefónico' : phone}
                    autoComplete ="off"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <a onClick={() => {saveData()}} className="btn-form-profile"><strong>Regístrate</strong></a>
                </form>
            </div>
        </div>
    )
}
export default Profile
