import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'

function Navbar() {
    const {state,dispatch} = useContext(UserContext);
    const history = useHistory()
    const RenderList = () => {
        if(state){
            return[
                <li><Link to ="/profile">Profile</Link></li>,
                <li><Link to ="/create">Create Post</Link></li>,
                <li>
                    <button className="btn #64b5f6 blue darken-1" onClick={() =>{
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push('/signin')
                    }}>LogOut</button>
                </li>
            ]
        }else{
            return[
                <li><Link to ="/signin">Signin</Link></li>,
                <li><Link to ="/signup">Signup</Link></li>
            ]
        }
    }
    return (
        <div>
            <nav>
                <div className="nav-wrapper white">
                    <Link to = {state ? "/" : "/signin"} className="brand-logo left">Connect.us</Link>
                    <ul id="nav-mobile" className="right">
                        {RenderList()}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
