import '../../assets/stylesheets/home.css'
import Input from '../utils/input'
import Button from '../utils/Button'

const Home = () => {
    return (
        <div className="home-container">

            <div className="home-text">
                <h1 className="home-header">Bienvenido</h1>
                <p className="home-p1">Regístrate al STCC</p>
                <p className="home-p2">Registrándote podrás visualizar las condiciones climatológicas de tu cultivo en tiempo real y recibirás notificaciones en caso de un posible riesgo. </p>
                <Button style="btn-home-up" url="/registro" text="Regístrate"/>
            </div>
            <div className="home-box">
                <div className="signin-box">
                    <h1 className="signin-box-header">O inicia sesión con tu cuenta</h1>
                    <form className="home-form" onSubmit="" method="POST">
                        <Input styleClass="data-in1" type="text" placeholder="Usuario"/>
                        <Input styleClass="data-in2" type="password" placeholder="Contraseña"/>
                        <Button style="btn-form" url="/" text="Iniciar Sesión"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home
