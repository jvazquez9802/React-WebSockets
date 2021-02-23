import '../../assets/stylesheets/signup.css'

import Input from '../utils/input'
import Button from '../utils/Button'

const SignUp = () => {
    return (
        <div className="SignUp-content">
            <div className="SignUp-box">
                <h1 className="SignUp-title">Forma parte del STCC</h1>
                <form className="SignUp-form" method="POST" action="/"> 
                <Input styleClass="in-user" type="text" placeholder="Usuario"/>
                <Input styleClass="in-mail" type="mail" placeholder="Correo"/>
                <Input styleClass="in-name" type="text" placeholder="Nombre"/>
                <Input styleClass="in-curp" type="text" placeholder="CURP"/>
                <Input styleClass="in-rfc" type="text" placeholder="RFC"/>
                <Input styleClass="in-password" type="password" placeholder="Contraseña"/>
                <Input styleClass="in-confirm-password" type="password" placeholder="Confirmar Contraseña"/>
                <Input styleClass="in-phone" type="text" placeholder="Confirmar Contraseña"/>
                <Button style="btn-form" url="/" text="Regístrate"/>
                
                </form>
            </div>
        </div>
    )
}
export default SignUp
