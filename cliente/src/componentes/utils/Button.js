import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Button = ({ style, text, color, url }) => {
    return (
        <Link className={style} to={url} style = {{backgroundColor:color}}><strong>{text}</strong></Link>
    )
}

Button.defaultProps = {
    color: '',
    style: 'button is-light',
    url: '/',
    text:'',

}
  
Button.propTypes = {
    color: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
}

export default Button
