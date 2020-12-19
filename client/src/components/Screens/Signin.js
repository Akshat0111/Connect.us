import React from 'react'
import {Link} from 'react-router-dom'

function Signin() {
    return (
        <div className="mycard">
            <div className = "card auth-card input-field">
                <h2>Connect.us</h2>
                <input type = "text" placeholder = "Email"/>
                <input type = "text" placeholder = "Password"/>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1">Signin</button>
                <h6><Link to = "/signup">Don't have an account?</Link></h6>
            </div>
        </div>
    )
}

export default Signin
