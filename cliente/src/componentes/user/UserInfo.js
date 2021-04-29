import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '../../AuthContext'

const UserInfo = ({setError}) => {

    const { currentUser } = useAuth()
    
    const [name, setName] = useState('')
    const [curp, setCurp] = useState('')
    const [rfc, setRfc] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)

    const [edit, setEdit] = useState(false)

    const saveData = async () => {
        setError('')
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:5000/user/${currentUser.uid}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
                body: JSON.stringify({
                    name: name,
                    curp: curp.toUpperCase(),
                    rfc: rfc.toUpperCase(),
                    phone: phone
                }),
            })
            
            const res = await response.json();
            res.success ? alert('Actualización exitosa') : alert('Fallo al actualizar los datos')
        } catch {
            setError('Fallo al guardar la información')
        }
        setLoading(false)
        setEdit(!edit)
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
    }, [])

    return (
        <div className="profile-box">
        <h1 className="profile-title">información de usuario</h1>
        <form className="profile-form">

            {edit &&
                <>
                    <input 
                        className="in-name"
                        type="text"
                        placeholder={name === '' ? 'Agrega tu nombre' : name}
                        value={name}
                        autoComplete ="off"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input 
                        className="in-curp"
                        type="text"
                        placeholder={curp === '' ? 'Agrega tu CURP' : curp}
                        value={curp}
                        autoComplete ="off"
                        onChange={(e) => setCurp(e.target.value)}
                        required
                    />
                    <input 
                        className="in-rfc"
                        type="text"
                        placeholder={rfc === '' ? 'Agrega tu RFC' : rfc}
                        value ={rfc}
                        autoComplete ="off"
                        onChange={(e) => setRfc(e.target.value)}
                        required
                    />
                    <input 
                        className="in-phone"
                        type="text"
                        placeholder={phone === '' ? 'Agrega tu número telefónico' : phone}
                        value={phone}
                        autoComplete ="off"
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    {!loading &&
                        <>
                            <a onClick={() => {setEdit(!edit)}} className="btn-cancel-edit"><strong>Cancelar</strong></a>
                            <a onClick={() => {saveData()}} className="btn-form-profile"><strong>Guardar</strong></a>
                        </>
                    }
                </>
            }
            {!edit &&
                <>
                    <p className="in-name">{name === '' ? 'Agrega tu nombre' : 'Nombre: ' + name}</p>
                    <p className="in-curp">{curp === '' ? 'Agrega tu CURP' : 'CURP: ' + curp}</p>
                    <p className="in-rfc">{rfc === '' ? 'Agrega tu RFC' : 'RFC: ' + rfc}</p>
                    <p className="in-phone">{phone === '' ? 'Agrega tu némero telefónico' : 'Teléfono: ' + phone}</p>
                    <a onClick={() => {setEdit(!edit)}} className="btn-form-profile"><strong>Editar</strong></a>
                </>
            }
        </form>
    </div>
    )
}

export default UserInfo
