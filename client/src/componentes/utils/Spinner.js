import '../../assets/stylesheets/spinner.css'
import { BeatLoader } from 'react-spinners'

function Spinner() {

  return (
    <div className="spinner-box">
        <div className="loader-box">
            <BeatLoader loading />
        </div>
    </div>
)
}

export default Spinner