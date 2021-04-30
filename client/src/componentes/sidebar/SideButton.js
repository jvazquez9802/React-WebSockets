import '../../assets/stylesheets/sidebutton.css'

import { Link } from 'react-router-dom'

const SideButton = ({image, text, url }) => {
    return (
        <Link className= "btn-side" to={url}>
                <div className="text-content">
                    <p>{text}</p>
                </div>
                <div className="image-content">
                    <img className="img-center" src={image} alt="" width="40" height="40"/>
                </div>
        </Link>
    )
}

export default SideButton
