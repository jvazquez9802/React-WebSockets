import '../../assets/stylesheets/profile.css'
import SessionInfo from './SessionInfo'
import UserInfo from './UserInfo'
import { useState } from 'react'

const Profile = () => {

    const [ error, setError ] = useState('')

    return (
        <div className="profile-content">
            <UserInfo setError={setError}/>
            <SessionInfo/>
        </div>
    )
}
export default Profile
