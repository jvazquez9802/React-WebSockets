import '../../assets/stylesheets/sidebar.css'
import SideButton from './SideButton'
import temperature from '../../assets/images/img-temperature.png'
import humidity from '../../assets/images/img-humidity.png'
import wind from '../../assets/images/img-wind.png'
import pressure from '../../assets/images/img-pressure.png'
import sun from '../../assets/images/img-sun.png'
import cloud from '../../assets/images/img-cloud.png'


const Bar = () => {
    return (
        <aside className="box-side">
        <SideButton image={temperature} text="Temperatura" url="/temperatura"/>
        <SideButton image={humidity} text="Humedad" url="/"/>
        <SideButton image={wind} text="Dirección del viento" url="/"/>
        <SideButton image={pressure} text="Presión" url="/"/>
        <SideButton image={sun} text="Radiación solar" url="/"/>
        <SideButton image={cloud} text="Precipitación" url="/"/>
      </aside>
    )
}
export default Bar
